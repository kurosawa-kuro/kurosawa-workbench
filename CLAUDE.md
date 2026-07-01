# CLAUDE.md

このファイルは Claude Code がこのリポジトリで作業する際の最小ガイド。

## Source of Truth

- Project overview: `README.md`
- Documentation index: `docs/00_index.md`
- Requirements: `docs/01_requirements.md`
- Architecture: `docs/02_architecture.md`
- Domain model: `docs/03_domain_model.md`
- Data model: `docs/05_data_model.md`
- Workflows: `docs/04_workflows.md`
- Test strategy: `docs/07_test_strategy.md`
- Harness 全体像: `.claude/README.md`
- Task notes: `docs/tasks/`

## 現在のアプリ構成

React Router による 6 ページ構成。

```text
/
/services
/ai-consult
/career
/cases
/contact
```

トップは分岐ハブ。`/services` は営業ページの主役、`/ai-consult` は AI 相談体験の主役。
`/career` と `/cases` は信用補強、`/contact` は最終導線。

## コマンド

```bash
make setup
make build
make run
make dev
make lint
make fmt
cd app && npx playwright test
```

## アーキテクチャ

- フロントエンドは `app/` 配下。
- React 19 + Vite 8 + React Router。
- 画面設計は独自 CSS + Motion + View Transitions。
- 固定データは `app/src/data/`。
  - `engineer-profile.js`
  - `services.js`
  - `consultExamples.js`
  - `cases.js`
- AI 相談は `app/src/components/ConsultSection.jsx` と `/ai-consult` で提供する。
- DeepSeek API キーはブラウザに出さない。Supabase Edge Function `consult-engineer` 経由で呼び出す。
- AI 相談履歴は `localStorage['workbench-consultations']`。サーバーサイド永続化なし。
- AI 利用回数は `localStorage['workbench_ai_usage_<YYYY-MM-DD>']`。
- 非機密の設定は `env/config.yaml`、フロントのローカル環境変数は `app/.env.local`。

## 作業ルール

- 推測でコードを書かない。コマンドを書いたら実際に実行して確認する。
- 仕様変更は連動する `docs/` とテストを同一 PR で直す。drift を作らない。
- トップに詳細情報を戻さない。詳細は `/services`, `/career`, `/cases`, `/ai-consult` に分ける。
- 依頼メニュー・相談例・案件タイプはページに直書きせず `app/src/data/` に置く。
- 既存の関数・ユーティリティ・パターンを優先的に再利用する。
- task note を仕様の正本にしない。確定内容は docs 本体、ADR、runbook に昇格する。
- **Scope invariant**: Goal/Scope 外の変更、前提崩れ、追加副作用、docs と実装の矛盾を見つけたら即実装しない。分類するか follow-up task に残す。

## AI Runtime Protocol（薄い・常時）

Thin Harness の常時手順。詳細は `.claude/README.md` と `docs/specs/runtime-protocol.md`。

1. Goal / Scope / Done を言い直す。
2. Weight Class を判定する。
3. owner-only 判断・保護 capability・allowed/forbidden paths を確認する。
4. Standard/Heavy は skeleton + TDD contract を先に作る。
5. scope 内で最小変更を当てる。
6. 必要 Evidence Level で検証する。
7. scope 拡大・保護境界接触・二度違う理由で検証失敗したら停止して owner へ。
8. 非自明な判断を下した時だけ記録する。
