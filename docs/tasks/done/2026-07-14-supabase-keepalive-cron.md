# Supabase keep-alive Cron を実装する

## Goal

共有 Supabase プロジェクトに日次の軽量 DB activity を発生させ、休止リスクを下げつつ失敗を Cloudflare Cron Events / Workers Logs で検知できるようにする。

## Context

- `kurosawa-ai-consulting-site` と `lumiere-select` は Supabase project `ftimimljrflfboopsqgm` を共有する。
- Supabase 公式説明は、休止判定を user database activity / user queries を中心に説明している。Edge Function の OPTIONS だけでは根拠が弱い。
- GitHub Actions schedule は公開リポジトリが 60 日無活動だと自動停止するため、低活動対策の実行基盤として採用しない。
- cron はこのリポジトリの Cloudflare Worker 1 系統に集約する。

## Scope

- `project_health` singleton table と anon SELECT 専用 RLS policy
- Cloudflare Cron Worker（日次、DB SELECT 3 回、構造化ログ、失敗時 throw）
- Worker runtime unit tests / type generation / deploy dry-run
- Makefile と運用ドキュメント
- アプリ UI / Edge Function / DeepSeek 呼び出しは変更しない

## Skeleton

```text
Cloudflare Cron (03:23 UTC daily)
  -> shared-supabase-keepalive Worker
    -> PostgREST project_health SELECT x3
      -> success log / failure log + failed Cron Event
```

## Plan

- [x] 公式情報と共有構成を確認する
- [x] migration と Worker skeleton を追加する
- [x] generated types / unit tests / typecheck / dry-run を通す
- [x] 既存 app の build / lint / E2E を通す
- [x] runbook と正本 docs を同期して done へ移す

## Acceptance Criteria

- [x] cron は 1 日 1 回、共有 project に DB query を 3 回送る
- [x] anon role は `project_health` の SELECT だけが可能で、書き込み権限を持たない
- [x] anon key は `wrangler secret` で管理し、ソース・config・ログへ出さない
- [x] HTTP failure / unexpected response は Cron invocation failure になる
- [x] Worker tests / typecheck / dry-run と既存 app 品質ゲートが成功する
- [x] migration / secret / deploy / verification / recovery の手順が runbook にある

## Verification

- `make keepalive-check`: PASS
  - Wrangler Env/runtime type generation: PASS
  - `tsc --noEmit`: PASS
  - Workers runtime unit tests: 5 passed
  - `wrangler deploy --dry-run`: PASS（3.05 KiB / gzip 1.22 KiB）
- `supabase migration list`: linked project `ftimimljrflfboopsqgm`、migration `20260714000000` は local pending と確認
- `supabase db push --linked --dry-run`: 対象 migration 1件を確認、remote write なし
- `cd app && npm run build`: PASS（既存 bundle size warning のみ）
- `cd app && npm run lint`: PASS
- `cd app && xvfb-run -a npx playwright test`: 12 passed
- `npm install` audit: 0 vulnerabilities

## Notes

- Free Plan の休止回避を保証する唯一の方法は Pro への移行。keep-alive は休止リスクを下げる運用策として扱う。
- 本番 migration、Cloudflare Secret 登録、Worker deploy は未実施。ユーザーが明示的に本番反映を依頼したときに `docs/runbooks/supabase-keepalive.md` の順で実行する。
- migration と Worker deploy は別々の本番変更。migration 適用後に secret を設定し、その後 Worker を deploy する。
