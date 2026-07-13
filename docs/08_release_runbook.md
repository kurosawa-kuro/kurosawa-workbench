# 08 リリース Runbook

## リリース前チェック

```bash
make build        # ビルドエラーがないことを確認
make lint         # oxlint
cd app && npx playwright test   # E2E（routes スモーク）
```

- `docs/tasks/active/` にリリース前の未完了 blocker が残っていないことを確認する。
- リリース対象 task の `Verification` に検証結果が残っていることを確認する。
- `.env.local` はコミットしない。Cloudflare / Supabase 側の環境変数・Secrets で管理する。

## デプロイ手順

### 1. Edge Function（Supabase）

```bash
make fn-deploy
# → supabase functions deploy consult-engineer
```

デプロイ後の動作確認:

```bash
make fn-logs      # ログに ERROR がないことを確認
```

Supabase Secrets:

| 変数名 | 用途 |
|---|---|
| `DEEPSEEK_API_KEY` | Edge Function から DeepSeek を呼ぶ。ブラウザには公開しない |
| `DEEPSEEK_MODEL` | 任意。未設定時は `deepseek-chat` を使う |

### 2. フロントエンド（Cloudflare Pages）

VITE 環境変数はビルド時にバンドルへ埋め込まれる。`app/.env.local`（または CI の環境変数）に以下を設定してからビルドする。

| 変数名 | 値 |
|---|---|
| `VITE_SUPABASE_URL` | Supabase Dashboard > Settings > API の Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Dashboard > Settings > API の anon key |

```bash
make build        # app/dist/ を生成（VITE_* を埋め込む）
make deploy       # cd app && wrangler pages deploy dist --project-name kurosawa-workbench --commit-dirty=true
```

直接実行する場合:

```bash
cd app && wrangler pages deploy dist --project-name kurosawa-workbench --commit-dirty=true
```

> Cloudflare Pages プロジェクトは `kurosawa-workbench`（公開 URL: `https://kurosawa-workbench.pages.dev/`）。
> EC デモの `lumiere-select` とは別プロジェクトのため、`--project-name` を取り違えないこと。
> `CLOUDFLARE_API_TOKEN` が必要（`wrangler whoami` で認証を確認）。

### 3. 共有 Supabase keep-alive（変更時のみ）

`project_health` migration または `ops/supabase-keepalive/` を変更した場合だけ実行する。Lumière Select 側へ同じ Worker を作らない。

```bash
make keepalive-check
supabase db push
make keepalive-secret   # 初回、または anon key rotation 時だけ
make keepalive-deploy
make keepalive-tail
```

詳細な導入順、手動疎通、監視、rollback は `docs/runbooks/supabase-keepalive.md` を参照する。

## デプロイ後確認

公開 URL で以下を目視確認:

1. トップページが開く（タイトルが「黒澤 Workbench …」）
2. ヒーロー（名前 / ステータス / consult() パイプライン図）が表示される
3. 得意領域カードと実績リストが表示される
4. 案件概要を入力 → AI 相談 → fit 判定（対応可否・スコープ・問い合わせ文）が返る
5. NG 条件（例: 常駐必須）で `fit: "ng"` と理由が返る
6. 「問い合わせ文」がコピー / メール送信できる
7. `prefers-reduced-motion: reduce` で過剰なアニメーションが抑制される
8. ページリロード / 直接アクセスで 404 にならない（`_redirects` が効いている）

## ロールバック

**Edge Function**: Supabase Dashboard > Edge Functions > `consult-engineer` > 旧バージョンに切り替える

**フロントエンド**: Cloudflare Pages Dashboard > `kurosawa-workbench` > Deployments > 前のデプロイに "Rollback" する

## リリース後タスク

- リリース後の確認事項は `docs/tasks/active/` または `docs/tasks/backlog/` に残す。
- 恒久的な運用手順になったものは `docs/runbooks/` へ昇格する。
