# Observed Change Signals

evidence_id: ev.change_signal.summary

This is git history evidence for files that changed often. It is not a defect claim.

| path | commit_count | churn | distinct_authors | last_changed |
|---|---:|---:|---:|---|
| `app/src/index.css` | 3 | 3143 | 1 | `2026-07-02T01:44:57+09:00` |
| `docs/runbooks/frontend-design-rebuild-runbook.md` | 2 | 550 | 1 | `2026-07-02T01:17:57+09:00` |
| `supabase/config.toml` | 2 | 455 | 1 | `2026-07-02T01:17:57+09:00` |
| `app/src/pages/Top.jsx` | 2 | 409 | 1 | `2026-07-02T01:17:57+09:00` |
| `app/src/components/ConsultSection.jsx` | 2 | 399 | 1 | `2026-07-02T01:17:57+09:00` |
| `docs/01_requirements.md` | 2 | 284 | 1 | `2026-07-02T01:28:23+09:00` |
| `app/src/data/engineer-profile.js` | 2 | 274 | 1 | `2026-07-02T01:44:57+09:00` |
| `docs/02_architecture.md` | 2 | 269 | 1 | `2026-07-02T01:28:23+09:00` |
| `supabase/functions/consult-engineer/index.ts` | 2 | 245 | 1 | `2026-07-02T01:44:57+09:00` |
| `app/e2e/demo-flow.spec.js` | 2 | 186 | 1 | `2026-07-02T01:17:57+09:00` |
| `supabase/functions/concierge/index.ts` | 2 | 182 | 1 | `2026-07-02T01:17:57+09:00` |
| `docs/04_workflows.md` | 2 | 180 | 1 | `2026-07-02T01:28:23+09:00` |
| `docs/05_data_model.md` | 2 | 180 | 1 | `2026-07-02T01:28:23+09:00` |
| `supabase/functions/recommend-products/index.ts` | 2 | 158 | 1 | `2026-07-02T01:17:57+09:00` |
| `docs/08_release_runbook.md` | 2 | 145 | 1 | `2026-07-02T01:17:57+09:00` |
| `app/src/pages/Services.jsx` | 2 | 144 | 1 | `2026-07-02T01:44:57+09:00` |
| `CLAUDE.md` | 2 | 139 | 1 | `2026-07-02T01:28:23+09:00` |
| `README.md` | 2 | 130 | 1 | `2026-07-02T01:28:23+09:00` |
| `docs/03_domain_model.md` | 2 | 130 | 1 | `2026-07-02T01:28:23+09:00` |
| `docs/07_test_strategy.md` | 2 | 101 | 1 | `2026-07-02T01:17:57+09:00` |

## Notes

- churn = added + deleted lines from `git log --numstat`.
- binary file churn is counted as 0 when git reports `-`.
