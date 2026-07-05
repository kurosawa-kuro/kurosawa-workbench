# grep: job_lifecycle

evidence_id: ev.grep.job_lifecycle
description: job lifecycle / retry / timeout / status

- app/.wrangler/.claude/hooks/detect-unverified-claim.sh:L10: changed="$(git status --porcelain docs/tasks/done/ 2>/dev/null | head -n1 || true)"
- app/.wrangler/.claude/settings.json:L14: "Bash(git status:*)",
- app/.wrangler/.claude/settings.json:L53: "statusMessage": "safety-boundary check"
- app/.wrangler/.claude/settings.json:L65: "statusMessage": "scope-creep check"
- app/.wrangler/.claude/settings.json:L80: "statusMessage": "decision-log session boundary"
- app/.wrangler/.claude/settings.json:L85: "statusMessage": "unverified-claim check"
- app/playwright.config.js:L5: timeout: 30000,
- app/playwright.config.js:L21: timeout: 15000,
- app/src/components/ConsultSection.jsx:L38: const [status, setStatus] = useState('idle')
- app/src/components/ConsultSection.jsx:L49: setStatus('loading')
- app/src/components/ConsultSection.jsx:L54: setStatus('done')
- app/src/components/ConsultSection.jsx:L58: setStatus('error')
- app/src/components/ConsultSection.jsx:L66: setTimeout(() => setCopied(false), 2000)
- app/src/components/ConsultSection.jsx:L72: <ConsultPipeline status={status} />
- app/src/components/ConsultSection.jsx:L178: disabled={status === 'loading'}
- app/src/components/ConsultSection.jsx:L183: animate={status === 'loading' ? { rotate: 360 } : { rotate: 0 }}
- app/src/components/ConsultSection.jsx:L184: transition={status === 'loading'
- app/src/components/ConsultSection.jsx:L191: {status === 'loading' ? 'AI が判定中...' : 'AI に相談する'}
- app/src/components/ConsultSection.jsx:L197: {status === 'idle' && (
- app/src/components/ConsultSection.jsx:L213: {status === 'loading' && (
- app/src/components/ConsultSection.jsx:L266: {(status === 'done' || status === 'error') && result && (
- app/src/components/ConsultSection.jsx:L299: function ConsultPipeline({ status }) {
- app/src/components/ConsultSection.jsx:L301: if (key = <redacted>
- app/src/components/ConsultSection.jsx:L303: if (status === 'loading') return 'active'
- app/src/components/ConsultSection.jsx:L304: return status === 'done' || status === 'error' ? 'done' : 'idle'
- app/src/components/ConsultSection.jsx:L306: return status === 'done' || status === 'error' ? 'done' : 'idle'
- app/test-results/.last-run.json:L2: "status": "passed",
- supabase/config.toml:L39: health_timeout = "2m"
- supabase/config.toml:L135: # Store analytical data in S3 for running ETL jobs over Iceberg Catalog
- supabase/config.toml:L271: # Configure logged in session timeouts.
- supabase/config.toml:L276: # inactivity_timeout = "8h"
- supabase/config.toml:L376: # Supported request policies: `oneshot`, `per_worker`.
- supabase/config.toml:L377: # `per_worker` (default) — enables hot reload during local development.
- supabase/config.toml:L379: policy = "per_worker"
- supabase/functions/consult-engineer/index.ts:L88: function json(body: unknown, status = 200) {
- supabase/functions/consult-engineer/index.ts:L90: status,
