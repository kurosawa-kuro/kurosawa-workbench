# Code Metrics

evidence_id: ev.code_metrics.summary

Deterministic size and symbol-count signals. These are risk-prioritization signals, not defect claims.

| path | language | loc | non_empty_loc | symbols | public_symbols | tests | max_line_length |
|---|---|---:|---:|---:|---:|---:|---:|
| `app/e2e/routes.spec.js` | `typescript` | 33 | 28 | 0 | 0 | 0 | 118 |
| `app/index.html` | `html` | 23 | 23 | 1 | 0 | 0 | 254 |
| `app/playwright.config.js` | `typescript` | 23 | 22 | 0 | 0 | 0 | 77 |
| `app/src/App.css` | `css` | 184 | 158 | 19 | 0 | 0 | 80 |
| `app/src/App.jsx` | `typescript` | 29 | 28 | 1 | 1 | 0 | 63 |
| `app/src/components/ConsultSection.jsx` | `typescript` | 397 | 372 | 12 | 1 | 1 | 153 |
| `app/src/components/Footer.jsx` | `typescript` | 46 | 42 | 2 | 1 | 0 | 83 |
| `app/src/components/Header.jsx` | `typescript` | 24 | 23 | 1 | 1 | 0 | 80 |
| `app/src/data/cases.js` | `typescript` | 38 | 38 | 0 | 0 | 0 | 129 |
| `app/src/data/consultExamples.js` | `typescript` | 16 | 15 | 0 | 0 | 0 | 71 |
| `app/src/data/engineer-profile.js` | `typescript` | 166 | 159 | 0 | 0 | 0 | 185 |
| `app/src/data/services.js` | `typescript` | 68 | 67 | 0 | 0 | 0 | 138 |
| `app/src/index.css` | `css` | 1587 | 1504 | 358 | 0 | 0 | 269 |
| `app/src/lib/aiLimit.js` | `typescript` | 23 | 20 | 3 | 3 | 1 | 119 |
| `app/src/lib/motion.js` | `typescript` | 33 | 26 | 1 | 1 | 0 | 73 |
| `app/src/lib/supabase.js` | `typescript` | 19 | 16 | 1 | 1 | 0 | 84 |
| `app/src/lib/viewTransition.js` | `typescript` | 7 | 7 | 1 | 1 | 0 | 72 |
| `app/src/main.jsx` | `typescript` | 10 | 9 | 0 | 0 | 0 | 51 |
| `app/src/pages/AiConsult.jsx` | `typescript` | 36 | 33 | 1 | 1 | 0 | 210 |
| `app/src/pages/Career.jsx` | `typescript` | 115 | 106 | 5 | 1 | 0 | 105 |
| `app/src/pages/Cases.jsx` | `typescript` | 41 | 38 | 2 | 1 | 0 | 140 |
| `app/src/pages/Contact.jsx` | `typescript` | 38 | 35 | 2 | 1 | 0 | 129 |
| `app/src/pages/Services.jsx` | `typescript` | 114 | 106 | 5 | 1 | 0 | 129 |
| `app/src/pages/Top.jsx` | `typescript` | 123 | 118 | 1 | 1 | 0 | 185 |
| `app/vite.config.js` | `typescript` | 18 | 16 | 1 | 0 | 0 | 81 |
| `doppler.yaml` | `github-actions` | 27 | 25 | 0 | 0 | 0 | 119 |
| `env/config.yaml` | `github-actions` | 25 | 21 | 0 | 0 | 0 | 140 |
| `env/project.yaml` | `github-actions` | 9 | 8 | 0 | 0 | 0 | 64 |
| `env/secret.yaml` | `github-actions` | 12 | 10 | 0 | 0 | 0 | 97 |
| `supabase/functions/_shared/engineer-profile.ts` | `typescript` | 140 | 118 | 6 | 6 | 0 | 301 |
| `supabase/functions/consult-engineer/index.ts` | `typescript` | 93 | 77 | 7 | 0 | 0 | 120 |

## Guardrail

- Large files and many public symbols increase review attention; they do not prove unsafe code.
