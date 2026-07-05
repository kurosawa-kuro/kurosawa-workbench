# grep: high_risk_ops

evidence_id: ev.grep.high_risk_ops
description: delete / drop / truncate / migration

- app/src/index.css:L273: backdrop-filter: blur(12px);
- app/src/index.css:L274: -webkit-backdrop-filter: blur(12px);
- supabase/config.toml:L23: # deprecated and the field is removed on 2026-10-30 once the always-revoked behaviour is permanent.
- supabase/config.toml:L59: [db.migrations]
- supabase/config.toml:L60: # If disabled, migrations will be skipped during a db push or reset.
- supabase/config.toml:L67: # If enabled, seeds the database after migrations during a db reset.
