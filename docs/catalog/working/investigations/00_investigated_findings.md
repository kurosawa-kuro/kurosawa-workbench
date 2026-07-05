# Investigated Findings

generated_by: dcm investigate
source: non_llm_evidence_investigation
judgment_status: llm_enriched

## observed_signals

- Evidence Pack exists and has the required scan, symbol, config, risk, and scan-limitation files. evidence_ref: file=evidence/00_scan_manifest.md
- Symbol evidence exists for code navigation and candidate responsibility boundaries. evidence_ref: file=evidence/03_symbols.md
- Configuration and environment evidence exists for secret and runtime-risk review. evidence_ref: file=evidence/08_config_env.md
- Static signal evidence exists and must be investigated before draft. evidence_ref: file=evidence/30_static_signal_hits.md
- Scan limitation evidence exists and can inform descriptive current implications when judgment-relevant. evidence_ref: file=evidence/99_scan_limitations.md

## available_evidence_files

- `00_evidence_freshness.md`
- `00_scan_manifest.md`
- `01_file_tree.md`
- `02_files.json`
- `03_symbols.md`
- `04_symbols.json`
- `05_tests.md`
- `07_entrypoints.md`
- `08_config_env.md`
- `09_diff_evidence.md`
- `10_observed_change_signals.json`
- `10_observed_change_signals.md`
- `11_dependency_inventory.json`
- `11_dependency_inventory.md`
- `12_code_metrics.json`
- `12_code_metrics.md`
- `13_public_api_surface.json`
- `13_public_api_surface.md`
- `14_code_excerpts.json`
- `14_code_excerpts.md`
- `15_decision_memory.json`
- `15_decision_memory.md`
- `30_static_signal_hits.md`
- `98_redaction_report.md`
- `99_scan_limitations.md`

## llm_enrichment

## item_meaning_candidates

- The extensive CSS design-token custom properties (`--ink`, `--paper`, `--blueprint`, `--fit-high`, `--sp-*`, `--radius`, `--shadow`, `--font-*`, etc.) in `app/src/index.css` indicate a systematic theme layer, possibly a blueprint/engineering aesthetic with low/high fit color coding. This suggests the UI has explicit visual states for different confidence or suitability levels.  
  *Reference:* `evidence/03_symbols.md` – `app/src/index.css` custom-property symbols (lines 10–66).

- The presence of `ConsultSection`, `AiConsult`, `ConsultPipeline`, `ConsultResult` components, alongside `consultEngineer` (async) and `AiLimitExceededError`, signals a dedicated AI‑powered consultation feature with rate limiting.  
  *Reference:* `evidence/03_symbols.md` – components and functions in `app/src/components/ConsultSection.jsx`, `app/src/pages/AiConsult.jsx`, `app/src/lib/aiLimit.js`, `app/src/lib/supabase.js`.

- The detection of `change_signal` on `app/src/index.css`, `docs/runbooks/frontend-design-rebuild-runbook.md`, and `supabase/config.toml` implies the design system, a related runbook, and Supabase infrastructure were recently modified.  
  *Reference:* `evidence/30_static_signal_hits.md` – rows with `query_id=change_signal:*` and their `evidence_ref`.

- The high hit count for `auth_permission` (86 matches) and `env_secret` (50 matches) suggests the codebase contains a substantial amount of authorization logic and secret references, likely in both frontend and backend code.  
  *Reference:* `evidence/30_static_signal_hits.md` – rows for `auth_permission` and `env_secret`.

- The `job_lifecycle` signal (36 matches) may correlate with the consultation pipeline stages (e.g., state transitions in `ConsultSection.jsx`) or another background job system.  
  *Reference:* `evidence/30_static_signal_hits.md` – `job_lifecycle` hit count; `evidence/03_symbols.md` – `PIPELINE_STAGES` and `stateOf` in `ConsultSection.jsx`.

- The presence of `infra_surface` hits (12 matches) points to traces of infrastructure configuration (likely Supabase or Vite configuration) surfacing in static analysis.  
  *Reference:* `evidence/30_static_signal_hits.md` – `infra_surface` row.

## role_notes

- **Page-level components** – `App` (`app/src/App.jsx`), `Top` (`app/src/pages/Top.jsx`), `Career` (`app/src/pages/Career.jsx`), `Cases` (`app/src/pages/Cases.jsx`), `Contact` (`app/src/pages/Contact.jsx`), `Services` (`app/src/pages/Services.jsx`), `AiConsult` (`app/src/pages/AiConsult.jsx`) – act as route endpoints.  
  *Reference:* `evidence/03_symbols.md` – symbol entries for these files.

- **Consultation pipeline** – `ConsultSection` orchestrates the form/result flow; `ConsultPipeline` renders pipeline stages; `ConsultResult` displays AI output; `stateOf` controls stage transitions.  
  *Reference:* `evidence/03_symbols.md` – `ConsultSection`, `ConsultPipeline`, `ConsultResult`, `stateOf` in `app/src/components/ConsultSection.jsx`.

- **Backend edge function** – `consultEngineer` (`app/src/lib/supabase.js`) is the async client‑side call; `supabase/functions/consult-engineer/index.ts` contains the server‑side handler with constructs `DEEPSEEK_MODEL`, `MAX_INQUIRY_LENGTH`, `CORS`, `FALLBACK`, `SYSTEM_PROMPT`.  
  *Reference:* `evidence/03_symbols.md` – `consultEngineer` in `app/src/lib/supabase.js`; symbols from `supabase/functions/consult-engineer/index.ts`.

- **AI usage governance** – `AiLimitExceededError`, `consumeAiLimit`, and `getAiUsageToday` (`app/src/lib/aiLimit.js`) enforce a daily call budget. `AI_DAILY_LIMIT` (`app/vite.config.js`) sets the limit.  
  *Reference:* `evidence/03_symbols.md` – symbols from `app/src/lib/aiLimit.js` and `app/vite.config.js`.

- **Design system constants** – `EASE` (`app/src/lib/motion.js`) likely contains animation easing values; `startViewTransition` (`app/src/lib/viewTransition.js`) abstracts browser view‑transition API.  
  *Reference:* `evidence/03_symbols.md` – `EASE` in `app/src/lib/motion.js`, `startViewTransition` in `app/src/lib/viewTransition.js`.

- **Environment configuration** – `VITE_SUPABASE_ANON_KEY` and `VITE_SUPABASE_URL` are consumed in `app/src/lib/supabase.js` to initialise the Supabase client.  
  *Reference:* `evidence/08_config_env.md` – `found_in` for both variables.

## current_implications

- The application is a full‑stack web system (profiles: `css,html,infra,node,typescript`) with a React‑style frontend and a Supabase backend powered by edge functions. The scan covered 141 files, extracted 430 symbols, and found 2 tests and 2 entrypoints.  
  *Reference:* `evidence/00_scan_manifest.md` – detected profiles, counts.

- The AI consultation feature is live and uses a daily limit. The presence of `AiLimitExceededError` indicates the app explicitly handles over‑quota scenarios.  
  *Reference:* `evidence/03_symbols.md` – `AiLimitExceededError`; `evidence/08_config_env.md` – `AI_DAILY_LIMIT` (as a component in vite.config.js).

- The design system is rich and likely supports responsive layout (spacing scale, max-width variable `--maxw`). The blueprint‑themed custom properties (`--blueprint`, `--blueprint-ink`) suggest a visual identity evoking engineering diagrams.  
  *Reference:* `evidence/03_symbols.md` – CSS custom properties in `app/src/index.css`.

- The configuration variables (`VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_URL`) are required by the Supabase client. Their presence in the scan confirms they are actively used, but their requiredness and default values are not confirmed.  
  *Reference:* `evidence/08_config_env.md` – variable entries.

- Static signal hits imply the codebase has extensive authentication/authorization logic (86 `auth_permission` hits), references to secrets (50 `env_secret` hits), and potential high‑risk operations (6 `high_risk_ops` hits). These are observations only and do not indicate defects.  
  *Reference:* `evidence/30_static_signal_hits.md` – hit counts; `evidence/99_scan_limitations.md` – limitations on grep coverage.

- The change signals on multiple files indicate the project is under active development, particularly the design system, the consultation component, the Supabase configuration, and the top page.  
  *Reference:* `evidence/30_static_signal_hits.md` – `change_signal` rows.

## uncertainty_notes

- The responsibilities of all 430 extracted symbols are not yet determined (per `evidence/99_scan_limitations.md`). Many CSS classes and components may serve roles that are not immediately inferable from symbol names alone.

- The requiredness, optionality, and default values for `VITE_SUPABASE_ANON_KEY` and `VITE_SUPABASE_URL` are unknown (`evidence/08_config_env.md` – “requiredness: unknown”, “default 値は解析していない”). Secret handling for these values is also not assessed.

- A line in `supabase/functions/consult-engineer/index.ts` is `<REDACTED>`. Its content is unknown but likely contains sensitive information (e.g., an API key or token).  
  *Reference:* `evidence/03_symbols.md` – line 4 redacted in that file.

- The two tests and two entrypoints identified by the scan are not specified in the provided evidence; their exact locations and purposes are uncertain.

- The grep‑based signals (`env_secret`, `high_risk_ops`, etc.) are vocabulary‑dependent. “No‑hit” for `todos` does not prove absence of TODOs in the codebase (`evidence/99_scan_limitations.md`). Similarly, 50 `env_secret` hits may include false positives or duplicate references.

- The coverage warning about unsupported extensions (`example`, `local`, `png`, `sh`, `svg`, `toml`) means some files were skipped. Relevant configuration or documentation in `.toml` or `.sh` files may have been missed.  
  *Reference:* `evidence/00_scan_manifest.md` – coverage_warnings.

- The change signals on files like `docs/runbooks/frontend-design-rebuild-runbook.md` and `supabase/config.toml` are logged as observations only. They do not indicate whether those changes are deployed or still in progress; the scan’s `freshness_status` is “fresh” but only reflects the current commit.  
  *Reference:* `evidence/00_scan_manifest.md` – `freshness_status: fresh`; `evidence/30_static_signal_hits.md` – guardrail note.

## judgment_value_added

- Raw inventory has been classified into draft inputs: observed signals, roles, and current implications.
- LLM enrichment, when present, adds meaning for each evidence item without changing observed evidence.
- This file does not approve an implementation choice or prescribe future work. It prevents raw scan output from being treated as a completed Decision Catalog.

## draft_inputs

- Draft must create `catalog_items` where each item pairs fact and meaning.
- Draft must not include advice, recommendations, next actions, validation plans, rollback plans, or change boundaries.
- Draft must cite evidence_ids for fact items and must not invent facts outside the Evidence Pack.

## required_llm_enrichment

- Assign role/current implication to evidence items.
- Keep risk language descriptive and current-state only.
- Put judgment-relevant uncertainty in descriptive current implications instead of a separate field.

## next_step

- Run `dcm draft <TARGET>` or `dcm llm draft <TARGET>` only after this investigated findings file exists.
