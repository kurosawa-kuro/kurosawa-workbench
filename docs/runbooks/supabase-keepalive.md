# 共有 Supabase keep-alive Runbook

## 目的と保証範囲

`kurosawa-ai-consulting-site` と `lumiere-select` が共有する Supabase project `ftimimljrflfboopsqgm` に、毎日軽量な user database activity を発生させる。疎通失敗は Cloudflare Cron Events / Workers Logs に残す。

Supabase Free Plan は低 activity の project を7日間の状況から休止候補にする。公式説明は「少数の user query を毎日」が通常は十分としているが、Free Plan の休止回避を保証するものではない。保証が必要なら Pro Plan へ移行する。

## 構成

```text
03:23 UTC daily
  Cloudflare Cron Trigger
    -> Worker: shared-supabase-keepalive
      -> GET /rest/v1/project_health?select=id&id=eq.1&limit=1 (3 times)
        -> [{ "id": 1 }]
      -> structured success log

failure
  -> structured error log
  -> scheduled handler throws
  -> Cron Event = failed
```

- Edge Function と DeepSeek は呼ばないため LLM コストは発生しない。
- cron はこのリポジトリの1系統だけ。Lumière Select へ複製しない。
- Worker の public HTTP endpoint は持たない（`workers_dev: false`）。
- anon role は `project_health` を SELECT できるだけで、INSERT / UPDATE / DELETE はできない。

## 初回導入

### 1. 事前検証

```bash
make keepalive-install
make keepalive-check
supabase migration list
```

`make keepalive-check` は generated Env type、TypeScript、Workers runtime unit test、Wrangler deploy dry-run を実行する。

### 2. Supabase migration

linked project が `ftimimljrflfboopsqgm` であることを `supabase/.temp/project-ref` または `supabase status` で確認してから適用する。

```bash
supabase db push
```

適用後、Supabase SQL Editor で権限と row を確認する。

```sql
select id, created_at from public.project_health;

select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'project_health'
order by grantee, privilege_type;
```

期待値:

- row は `id = 1` の1件。
- `anon` の table privilege は `SELECT` のみ。

### 3. Worker Secret

Supabase Dashboard > Project Settings > API の anon key を対話入力する。

```bash
make keepalive-secret
```

- 値をコマンド引数に渡さない。
- `wrangler.jsonc`、`.dev.vars.example`、task、ログへ貼らない。
- ローカル実接続時だけ `ops/supabase-keepalive/.dev.vars` に置く。このファイルは gitignore 済み。

### 4. Worker deploy

```bash
make keepalive-deploy
```

Cloudflare Workers を初めて使う account では、Cron Trigger API の前提として account 共通の `workers.dev` subdomain 作成が必要。本 account では `kuro-dougu1.workers.dev` を作成済み。Worker 自体は `workers_dev: false` のため public URL を持たない。

Cron Trigger の追加・変更は全 edge への反映に最大15分かかる場合がある。

## 手動疎通

production と同じ Supabase に query するため、migration 適用後だけ実行する。

```bash
cd ops/supabase-keepalive
cp .dev.vars.example .dev.vars
# .dev.vars に実際の anon key を対話的に記入
npm run dev
```

別 terminal:

```bash
curl "http://localhost:8787/cdn-cgi/handler/scheduled?format=json"
```

期待値:

```json
{
  "outcome": "ok",
  "noRetry": false
}
```

## 監視

### リアルタイムログ

```bash
make keepalive-tail
```

成功 event:

```json
{"event":"supabase.keepalive.succeeded","requestCount":3,"table":"project_health"}
```

失敗 event:

```json
{"event":"supabase.keepalive.failed","error":"Supabase health query 1/3 failed with HTTP 503"}
```

Cloudflare Dashboard > Workers & Pages > `shared-supabase-keepalive` > Settings > Trigger Events で直近 Cron Events を確認する。初回作成・rename 後はイベント表示に最大30分かかる場合がある。

定期確認（月1回）:

1. 直近30日の日次 event に欠損がない。
2. 最新 event が success。
3. Worker Secret `SUPABASE_ANON_KEY` が存在する。
4. Supabase project status が `ACTIVE_HEALTHY`。

## 障害対応

### HTTP 401 / 403

1. anon key rotation の有無を確認する。
2. `make keepalive-secret` で key を更新する。
3. local scheduled handler で再確認する。

### HTTP 404 / unexpected payload

1. `supabase migration list` で migration 適用を確認する。
2. `project_health` の row `id = 1` と anon SELECT policy を確認する。
3. 必要なら migration を再適用する。アドホックな write policy は追加しない。

### DNS failure / HTTP 540 / project paused

1. Supabase Dashboard で project を restore する。
2. `ACTIVE_HEALTHY` まで待つ。
3. local scheduled handler を実行する。
4. Workers Logs で success を確認する。

Management API を使う場合は project admin token をログや shell history に残さない。

## 停止・rollback

Worker code の rollback:

```bash
cd ops/supabase-keepalive
npx wrangler rollback
```

cron を停止する場合は `wrangler.jsonc` の `triggers.crons` を空配列にして deploy する。Worker を止めてから `project_health` table の削除を検討する。先に table を削除すると日次エラーが継続する。

## 設計判断

- Edge Function OPTIONS は DB query である根拠がないため不採用。
- GitHub Actions schedule は公開リポジトリが60日無活動だと自動停止するため不採用。
- Cloudflare Cron は既存 Cloudflare account で管理でき、リポジトリ activity と独立して継続するため採用。
- 3日ごとではなく毎日3 query とし、Supabase が説明する「少数の user query を毎日」に合わせる。
