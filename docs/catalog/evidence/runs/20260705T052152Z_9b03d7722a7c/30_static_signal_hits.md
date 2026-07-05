# Static Signal Hits

This is a machine-generated signal inventory, not a decision.
Every row points back to grep evidence.

| query_id | hit_state | hits | evidence_ref | follow_up |
|---|---|---:|---|---|
| `todos` | `no_hit` | 0 | `file=evidence/grep/01_todos.md query_id=todos` | treat as no-hit, not absence |
| `job_lifecycle` | `matched` | 36 | `file=evidence/grep/02_job_lifecycle.md query_id=job_lifecycle` | review matching lines before deciding |
| `env_secret` | `matched` | 50 | `file=evidence/grep/03_env_secret.md query_id=env_secret` | review matching lines before deciding |
| `high_risk_ops` | `matched` | 6 | `file=evidence/grep/04_high_risk_ops.md query_id=high_risk_ops` | review matching lines before deciding |
| `auth_permission` | `matched` | 86 | `file=evidence/grep/05_auth_permission.md query_id=auth_permission` | review matching lines before deciding |
| `infra_surface` | `matched` | 12 | `file=evidence/grep/06_infra_surface.md query_id=infra_surface` | review matching lines before deciding |
| `change_signal:app/src/index.css` | `observed` | 3 | `file=evidence/10_observed_change_signals.md path=app/src/index.css` | inspect change history before editing |
| `change_signal:docs/runbooks/frontend-design-rebuild-runbook.md` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=docs/runbooks/frontend-design-rebuild-runbook.md` | inspect change history before editing |
| `change_signal:supabase/config.toml` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=supabase/config.toml` | inspect change history before editing |
| `change_signal:app/src/pages/Top.jsx` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=app/src/pages/Top.jsx` | inspect change history before editing |
| `change_signal:app/src/components/ConsultSection.jsx` | `observed` | 2 | `file=evidence/10_observed_change_signals.md path=app/src/components/ConsultSection.jsx` | inspect change history before editing |

## Guardrail

- Static signal entries are observations only. Decision Catalog claims still need explicit `evidence_ref` values.
