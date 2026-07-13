# Scan Manifest

schema_version: 1
tool_version: 0.1.0
scan_id: 20260705T052152Z_9b03d7722a7c
generated_at: 2026-07-05T05:21:52Z
tool: decision-catalog (dcm)
language: infra+web
root: /home/ubuntu/repos/portfolio/kurosawa-ai-consulting-site
git_commit: 19c7911fcdb6a354a33e05f8d50a8ff33151e9a1
git_branch: main
git_dirty: false
freshness_status: fresh

query_config_hash: e9dac3c3870d09c48c44a7f09c409e5a055fb41f762463fbe198c0ee6c5769aa
ignore_rules_hash: e8f0b03b63182f211b568f1e240f120892ed77d888a5fbac0075c20478e975a4
source_tree_hash: c7c08e8f791bb9c060ac80a7581ae9f48bf19ecfe288f920b5534e590d1c81a8
output_schema_version: 1

profile_resolution:
mode: auto
resolver: deterministic
llm_router_used: false
llm_router_is_evidence: false
candidates: infra,web
profiles_run: infra+web

requested_profiles: auto
detected_profiles: css,html,infra,node,typescript
coverage_warnings: unsupported extensions detected: example,local,png,sh,svg,toml

included_file_count: 141
symbol_count: 430
test_count: 2
entrypoint_count: 2

extractor:
  rust: syn AST exact v1 (line fallback only on parse failure)
  python: indent-heuristic v2 (public-by-convention/import/dependency inventory)
  typescript: line-heuristic v2 (export/import/dependency inventory)
  metrics: deterministic loc/symbol counts v1
  grep: substring v1

notes:
  - symbol 抽出は heuristic。macro / 動的生成は取りこぼす（99_scan_limitations.md 参照）。
  - grep no-hit は不存在の証明ではない。
