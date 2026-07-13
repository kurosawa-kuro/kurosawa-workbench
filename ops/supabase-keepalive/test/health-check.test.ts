import { describe, expect, it } from 'vitest'
import { runSupabaseHealthCheck } from '../src/health-check'

const env = {
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_ANON_KEY: 'test-anon-key',
}

describe('runSupabaseHealthCheck', () => {
  it('performs three bounded database reads with the anon key', async () => {
    const calls: Array<{ input: RequestInfo | URL; init?: RequestInit }> = []
    const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
      calls.push({ input, init })
      return Response.json([{ id: 1 }])
    }

    const result = await runSupabaseHealthCheck(env, fetcher)

    expect(calls).toHaveLength(3)
    expect(result).toEqual({
      requestCount: 3,
      projectHost: 'example.supabase.co',
      table: 'project_health',
    })

    const firstCall = calls[0]
    expect(String(firstCall.input)).toBe('https://example.supabase.co/rest/v1/project_health?select=id&id=eq.1&limit=1')
    expect(firstCall.init?.headers).toMatchObject({
      apikey: 'test-anon-key',
      Authorization: 'Bearer test-anon-key',
    })
  })

  it('fails when Supabase returns a non-success status without exposing the key', async () => {
    const fetcher = async () => new Response(null, { status: 503 })
    const error = await runSupabaseHealthCheck(env, fetcher).then(
      () => null,
      (reason: unknown) => reason,
    )

    expect(error).toBeInstanceOf(Error)
    if (!(error instanceof Error)) throw new Error('Expected health check to fail')
    expect(error.message).toContain('HTTP 503')
    expect(error.message).not.toContain('test-anon-key')
  })

  it('fails when the singleton row is missing', async () => {
    const fetcher = async () => Response.json([])

    await expect(runSupabaseHealthCheck(env, fetcher)).rejects.toThrow('unexpected payload')
  })

  it('rejects an insecure Supabase URL before making a request', async () => {
    let called = false
    const fetcher = async () => {
      called = true
      return Response.json([{ id: 1 }])
    }

    await expect(runSupabaseHealthCheck({ ...env, SUPABASE_URL: 'http://example.supabase.co' }, fetcher))
      .rejects.toThrow('must use HTTPS')
    expect(called).toBe(false)
  })

  it('rejects a missing anon key before making a request', async () => {
    let called = false
    const fetcher = async () => {
      called = true
      return Response.json([{ id: 1 }])
    }

    await expect(runSupabaseHealthCheck({ ...env, SUPABASE_ANON_KEY: '  ' }, fetcher))
      .rejects.toThrow('is not configured')
    expect(called).toBe(false)
  })
})
