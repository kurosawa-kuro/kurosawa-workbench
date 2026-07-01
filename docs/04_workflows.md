# 04 ワークフロー

## セットアップ

```bash
make setup
```

初回のみ:

```bash
supabase login
supabase link --project-ref <project-ref>
cp app/.env.local.example app/.env.local
```

`app/.env.local` には `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` を入れる。`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` は Supabase Secrets で管理する。

## 作業開始

```bash
git status --short
```

1. `docs/tasks/README.md` を見る。
2. `docs/tasks/active/` から今日の task を選ぶ。
3. task に Scope / Plan / Acceptance Criteria があることを確認する。
4. 仕様変更がある場合は、実装と同じタイミングで `docs/` を更新する。

## ローカル開発

```bash
make dev
```

デフォルトは Vite の `http://localhost:5173`。

現在の主要ルート:

```text
/
/services
/ai-consult
/career
/cases
/contact
```

## ビルド・静的解析

```bash
make build
make lint
```

または:

```bash
cd app && npm run build
cd app && npm run lint
```

## E2E / スモーク確認

```bash
cd app && npx playwright test
```

現在の E2E は以下を確認する。

- 6ルートが開く
- トップから `/services` と `/ai-consult` に進める
- `/ai-consult` に相談例と入力フォームが表示される

目視確認:

```bash
make debug
make debug-ui
```

## Edge Functions デプロイ

```bash
make fn-deploy
make fn-logs
```

対象 Function:

```text
consult-engineer
```

## Cloudflare Pages デプロイ

```bash
make build
make deploy
```

`make deploy` は `app/dist` を `kurosawa-workbench` project へ deploy する。

## 変更時の同期ルール

ページ構成を変えたら更新するもの:

- `README.md`
- `docs/01_requirements.md`
- `docs/02_architecture.md`
- `app/e2e/routes.spec.js`

固定データを変えたら更新するもの:

- `docs/03_domain_model.md`
- `docs/05_data_model.md`
- 必要なら `docs/01_requirements.md`

AI相談の入力・出力・判定を変えたら更新するもの:

- `docs/01_requirements.md`
- `docs/02_architecture.md`
- `docs/03_domain_model.md`
- `docs/05_data_model.md`
- E2Eまたは手動検証記録

## 作業終了

```bash
git diff --check
git status --short
```

- 実行した検証を task の `Verification` に残す。
- 未解決事項は task の `Notes` または `backlog/` に移す。
- 確定した仕様・手順・判断は docs 本体、runbook、ADR へ昇格する。
