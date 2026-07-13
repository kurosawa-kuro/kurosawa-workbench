import { runSupabaseHealthCheck } from './health-check'

export default {
  async scheduled(controller, env, _ctx): Promise<void> {
    const startedAt = Date.now()

    try {
      const result = await runSupabaseHealthCheck(env)
      console.log(JSON.stringify({
        event: 'supabase.keepalive.succeeded',
        cron: controller.cron,
        scheduledTime: new Date(controller.scheduledTime).toISOString(),
        durationMs: Date.now() - startedAt,
        ...result,
      }))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(JSON.stringify({
        event: 'supabase.keepalive.failed',
        cron: controller.cron,
        scheduledTime: new Date(controller.scheduledTime).toISOString(),
        durationMs: Date.now() - startedAt,
        error: message,
      }))
      throw error
    }
  },
} satisfies ExportedHandler<Env>
