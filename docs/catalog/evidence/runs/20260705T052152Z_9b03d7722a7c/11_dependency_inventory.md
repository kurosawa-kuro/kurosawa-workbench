# Dependency Inventory

evidence_id: ev.dependency_inventory.summary

This is a deterministic inventory of manifest dependencies and non-local imports. It is not a vulnerability or license claim.

| ecosystem | name | scope | source | found_in |
|---|---|---|---|---|
| `npm` | `@picocss/pico` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `@playwright/test` | `import` | `source` | app/e2e/routes.spec.js:L1 |
| `npm` | `@playwright/test` | `devDependencies` | `manifest` | app/package.json:L1 |
| `npm` | `@playwright/test` | `import` | `source` | app/playwright.config.js:L1 |
| `npm` | `@supabase/supabase-js` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `@supabase/supabase-js` | `import` | `source` | app/src/lib/supabase.js:L1 |
| `npm` | `@types/react` | `devDependencies` | `manifest` | app/package.json:L1 |
| `npm` | `@types/react-dom` | `devDependencies` | `manifest` | app/package.json:L1 |
| `npm` | `@vitejs/plugin-react` | `devDependencies` | `manifest` | app/package.json:L1 |
| `npm` | `@vitejs/plugin-react` | `import` | `source` | app/vite.config.js:L2 |
| `npm` | `fs` | `import` | `source` | app/vite.config.js:L3 |
| `npm` | `jsr:@supabase/functions-js/edge-runtime.d.ts` | `import` | `source` | supabase/functions/consult-engineer/index.ts:L1 |
| `npm` | `lucide-react` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/components/ConsultSection.jsx:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/components/Header.jsx:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/pages/AiConsult.jsx:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/pages/Career.jsx:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/pages/Contact.jsx:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/pages/Services.jsx:L1 |
| `npm` | `lucide-react` | `import` | `source` | app/src/pages/Top.jsx:L1 |
| `npm` | `motion` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `motion/react` | `import` | `source` | app/src/App.jsx:L1 |
| `npm` | `motion/react` | `import` | `source` | app/src/components/ConsultSection.jsx:L2 |
| `npm` | `motion/react` | `import` | `source` | app/src/pages/Career.jsx:L2 |
| `npm` | `motion/react` | `import` | `source` | app/src/pages/Top.jsx:L2 |
| `npm` | `oxlint` | `devDependencies` | `manifest` | app/package.json:L1 |
| `npm` | `path` | `import` | `source` | app/vite.config.js:L4 |
| `npm` | `react` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `react` | `import` | `source` | app/src/components/ConsultSection.jsx:L3 |
| `npm` | `react` | `import` | `source` | app/src/main.jsx:L1 |
| `npm` | `react-dom` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `react-dom/client` | `import` | `source` | app/src/main.jsx:L2 |
| `npm` | `react-router-dom` | `dependencies` | `manifest` | app/package.json:L1 |
| `npm` | `react-router-dom` | `import` | `source` | app/src/App.jsx:L2 |
| `npm` | `react-router-dom` | `import` | `source` | app/src/components/Header.jsx:L2 |
| `npm` | `react-router-dom` | `import` | `source` | app/src/pages/Contact.jsx:L2 |
| `npm` | `react-router-dom` | `import` | `source` | app/src/pages/Services.jsx:L2 |
| `npm` | `react-router-dom` | `import` | `source` | app/src/pages/Top.jsx:L3 |
| `npm` | `url` | `import` | `source` | app/vite.config.js:L5 |
| `npm` | `vite` | `devDependencies` | `manifest` | app/package.json:L1 |
| `npm` | `vite` | `import` | `source` | app/vite.config.js:L1 |

## Guardrail

- This inventory does not prove runtime use, reachability, vulnerability, or license obligations.
