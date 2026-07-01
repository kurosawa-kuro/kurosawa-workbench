# AGENTS.md

AI コーディングエージェント（Claude Code / Codex / GitHub Copilot 等）共通の作業ガイド。
Codex は作業前にこのファイルを読むため、ここには repo 共通方針のみ記す。
ツール固有の指示は各ツールのファイル（例: Claude Code は `CLAUDE.md`）に置く。

## プロジェクト概要

- 目的: **黒澤 Workbench** — 黒澤俊文のフリーランス営業サイト。
- 現在のプロダクト形: 6ページ構成の営業サイト。
  - `/`: 第一印象と分岐
  - `/services`: 依頼できる内容
  - `/ai-consult`: AI 案件相談
  - `/career`: 経歴・技術背景
  - `/cases`: 案件タイプ別の提供価値
  - `/contact`: 問い合わせ導線
- 主役: `/services` と `/ai-consult`。`/career` と `/cases` は信用補強。
- 主要技術: React 19 + Vite 8 / React Router / Cloudflare Pages / Supabase Edge Functions / DeepSeek API。

## セットアップ / 主要コマンド

```bash
make setup    # 依存取得 + ビルド
make dev      # 開発サーバー
make build    # 本番ビルド
make lint     # oxlint
make fmt      # フォーマット
cd app && npx playwright test
```

## 実装方針

- ページ責務を守る。トップに全情報を戻さない。
- `/services` は「何を頼めるか」を業務課題ベースで見せる。
- `/ai-consult` はただのチャットにしない。対応可能性、スコープ、リスク、質問、問い合わせ文に構造化する。
- 固定データは `app/src/data/` に置く。ページに直書きしない。
- AI の根拠は `app/src/data/engineer-profile.js` と `consult-engineer` Edge Function の system prompt。
- API キーはブラウザに出さない。`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` は Supabase Secrets。

## 検証

変更後は原則以下を実行する。

```bash
cd app && npm run build
cd app && npm run lint
cd app && npx playwright test
```

E2E は現在、6ルート表示、トップ主要導線、AI相談フォーム表示を確認する。

## ドキュメント

設計・仕様・運用は `docs/` 配下を参照。更新規約と権威順位は `docs/00_index.md` に従う。
仕様レベルの変更は連動するドキュメントを同一 PR でまとめて直す。

## Codex / Claude Code

- `AGENTS.md` は Codex / 他エージェント共通ガイド。
- `CLAUDE.md` は Claude Code の司令塔。
- `.claude/rules/` と `.claude/skills/` は Claude Code 用。Codex が読む前提にしない。
- Codex 向けに永続させたい recurring な指摘やミス防止は、この `AGENTS.md` または nested `AGENTS.md` に小さく追加する。

## Harness（AI 制御一式）

- このリポジトリの AI 制御の全体像は `.claude/README.md`。
- アーキ本体は `docs/specs/kurosawa-thin-harness-architecture.md`。
- repo 固有の脅威モデルは `docs/specs/{capability-boundary,change-boundary,runtime-protocol,evidence-policy,judgment-memory}.md`。
- permissions の ask/deny と保護パスは脅威モデルで決める。他プロジェクトの設定をそのまま移植しない。

## Task / Skill

- 一回性の作業計画・調査メモ・実装タスクは `docs/tasks/` に置く。
- 繰り返し使う作業手順は `.claude/skills/` に置く。
- task note を仕様の正本にしない。確定仕様は docs 本体へ昇格する。
