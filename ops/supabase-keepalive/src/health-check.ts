const HEALTH_TABLE = 'project_health'
const EXPECTED_ROW_ID = 1
const REQUEST_COUNT = 3
const REQUEST_TIMEOUT_MS = 10_000

export type HealthCheckResult = {
  requestCount: number
  projectHost: string
  table: string
}

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
type HealthCheckConfig = Readonly<{
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
}>

export async function runSupabaseHealthCheck(
  env: HealthCheckConfig,
  fetcher: Fetcher = fetch,
): Promise<HealthCheckResult> {
  const endpoint = buildEndpoint(env.SUPABASE_URL)
  const anonKey = env.SUPABASE_ANON_KEY.trim()

  if (!anonKey) {
    throw new Error('SUPABASE_ANON_KEY is not configured')
  }

  for (let requestNumber = 1; requestNumber <= REQUEST_COUNT; requestNumber += 1) {
    const response = await fetcher(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })

    if (!response.ok) {
      throw new Error(`Supabase health query ${requestNumber}/${REQUEST_COUNT} failed with HTTP ${response.status}`)
    }

    const body: unknown = await response.json()
    if (!hasExpectedHealthRow(body)) {
      throw new Error(`Supabase health query ${requestNumber}/${REQUEST_COUNT} returned an unexpected payload`)
    }
  }

  return {
    requestCount: REQUEST_COUNT,
    projectHost: endpoint.hostname,
    table: HEALTH_TABLE,
  }
}

function buildEndpoint(supabaseUrl: string): URL {
  let projectUrl: URL

  try {
    projectUrl = new URL(supabaseUrl)
  } catch {
    throw new Error('SUPABASE_URL must be a valid URL')
  }

  if (projectUrl.protocol !== 'https:') {
    throw new Error('SUPABASE_URL must use HTTPS')
  }

  const endpoint = new URL(`/rest/v1/${HEALTH_TABLE}`, projectUrl)
  endpoint.searchParams.set('select', 'id')
  endpoint.searchParams.set('id', `eq.${EXPECTED_ROW_ID}`)
  endpoint.searchParams.set('limit', '1')
  return endpoint
}

function hasExpectedHealthRow(value: unknown): value is Array<{ id: number }> {
  if (!Array.isArray(value) || value.length !== 1) {
    return false
  }

  const row: unknown = value[0]
  return typeof row === 'object' && row !== null && 'id' in row && row.id === EXPECTED_ROW_ID
}
