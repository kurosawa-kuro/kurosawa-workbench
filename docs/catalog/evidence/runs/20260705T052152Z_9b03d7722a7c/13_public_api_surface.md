# Public API Surface

evidence_id: ev.public_api_surface.summary

Public/exported symbols observed by deterministic heuristics. Use this as blast-radius evidence before classifying a bounded change.

| path | line | language | kind | name | parent |
|---|---:|---|---|---|---|
| `app/src/App.jsx` | 12 | `typescript` | `component` | `App` | `` |
| `app/src/components/ConsultSection.jsx` | 34 | `typescript` | `component` | `ConsultSection` | `` |
| `app/src/components/Footer.jsx` | 9 | `typescript` | `component` | `Footer` | `` |
| `app/src/components/Header.jsx` | 4 | `typescript` | `component` | `Header` | `` |
| `app/src/lib/aiLimit.js` | 1 | `typescript` | `class` | `AiLimitExceededError` | `` |
| `app/src/lib/aiLimit.js` | 21 | `typescript` | `function` | `getAiUsageToday` | `` |
| `app/src/lib/motion.js` | 3 | `typescript` | `component` | `EASE` | `` |
| `app/src/lib/supabase.js` | 11 | `typescript` | `function` | `consultEngineer` | `` |
| `app/src/lib/viewTransition.js` | 1 | `typescript` | `function` | `startViewTransition` | `` |
| `app/src/pages/AiConsult.jsx` | 5 | `typescript` | `component` | `AiConsult` | `` |
| `app/src/pages/Career.jsx` | 17 | `typescript` | `component` | `Career` | `` |
| `app/src/pages/Cases.jsx` | 3 | `typescript` | `component` | `Cases` | `` |
| `app/src/pages/Contact.jsx` | 6 | `typescript` | `component` | `Contact` | `` |
| `app/src/pages/Services.jsx` | 5 | `typescript` | `component` | `Services` | `` |
| `app/src/pages/Top.jsx` | 10 | `typescript` | `component` | `Top` | `` |
| `supabase/functions/_shared/engineer-profile.ts` | 16 | `typescript` | `component` | `SUMMARY` | `` |
| `supabase/functions/_shared/engineer-profile.ts` | 21 | `typescript` | `component` | `STRENGTHS` | `` |
| `supabase/functions/_shared/engineer-profile.ts` | 34 | `typescript` | `component` | `NG_CONDITIONS` | `` |
| `supabase/functions/_shared/engineer-profile.ts` | 42 | `typescript` | `component` | `WORK_STYLE` | `` |
| `supabase/functions/_shared/engineer-profile.ts` | 59 | `typescript` | `component` | `NG_RULES` | `` |
| `supabase/functions/_shared/engineer-profile.ts` | 92 | `typescript` | `function` | `buildSystemPrompt` | `` |

## Guardrail

- Public-by-convention for Python means names not starting with `_`; confirm package exports before API promises.
