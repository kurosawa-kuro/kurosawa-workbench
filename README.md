# 黒澤 Workbench

黒澤俊文のフリーランス営業サイトです。

単なる職務経歴ページではなく、訪問者が「この人に何を頼めるか」「自社課題に合うか」を短時間で判断できるように、営業ページと AI 案件相談を分けて設計しています。

## 現在のページ構成

| Route | 役割 |
|---|---|
| `/` | 第一印象と分岐。`/services` と `/ai-consult` へ送る入口 |
| `/services` | 依頼できる内容。営業ページの主役 |
| `/ai-consult` | 黒澤に依頼できそうかを AI に相談する体験ページ |
| `/career` | 黒澤の経歴・技術スタック・実績背景 |
| `/cases` | 案件タイプ別の提供価値 |
| `/contact` | 問い合わせ・業務委託相談 |

主役は `/services` と `/ai-consult` です。`/career` と `/cases` は信用補強、`/contact` は最終導線です。

## AI 案件相談

`/ai-consult` では、案件概要を入力すると AI が以下を返します。

| 返答項目 | 内容 |
|---|---|
| 対応可否・得意度 | `high` / `medium` / `low` / `ng` |
| 想定スコープ | 要件整理、PoC設計、実装、レビューなど |
| リスク・注意点 | フルリモート専門、スコープ調整、対象外領域など |
| 追加確認事項 | 初回ヒアリングで確認したい質問 |
| 問い合わせ文 | そのままコピーして送れる下書き |

常駐・出社必須、デザイン専業、DL研究専業、薬機法対応などは Edge Function 側のルールで先に `fit: ng` とし、不要な LLM 呼び出しを避けます。

## 技術スタック

| レイヤー | 技術 |
|---|---|
| フロントエンド | React 19 + Vite 8 |
| ルーティング | React Router |
| UI | Pico CSS + admin-pico デザインシステム + Motion |
| ホスティング | Cloudflare Pages |
| AI Gateway | Supabase Edge Functions (`consult-engineer`) |
| AI | DeepSeek API |
| 状態管理 | localStorage |
| テスト | Playwright / oxlint |

## 主なデータ

| ファイル | 内容 |
|---|---|
| `app/src/data/engineer-profile.js` | 黒澤プロフィール、得意領域、NG条件、AIプロンプト根拠 |
| `app/src/data/services.js` | 依頼メニュー、提供内容、向き不向き |
| `app/src/data/consultExamples.js` | AI相談例、回答構造 |
| `app/src/data/cases.js` | 案件タイプ別の提供価値 |

## セットアップ

```bash
make setup
make dev
make build
make lint
cd app && npx playwright test
```

`app/.env.local` には Supabase の公開 URL と anon key を入れます。`DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` は Supabase Secrets に置き、ブラウザには出しません。

## Supabase keep-alive

このサイトと Lumière Select が共有する Supabase Free Plan project の休止リスクを下げるため、`ops/supabase-keepalive/` に Cloudflare Cron Worker を置いています。毎日 03:23 UTC に `project_health` singleton row を3回だけ読み、成功・失敗を Workers Logs と Cron Events に記録します。LLM は呼びません。

初回設定、デプロイ、監視、復旧は [`docs/runbooks/supabase-keepalive.md`](docs/runbooks/supabase-keepalive.md) を参照してください。Free Plan の休止回避を保証する唯一の方法は Pro Plan への移行であり、この仕組みはリスク低減と早期検知のための運用策です。

## ドキュメント

- [`docs/01_requirements.md`](docs/01_requirements.md) - 要件、ページ責務、ユースケース
- [`docs/02_architecture.md`](docs/02_architecture.md) - 構成、ルーティング、Edge Function I/O
- [`docs/03_domain_model.md`](docs/03_domain_model.md) - ドメイン用語とライフサイクル
- [`docs/05_data_model.md`](docs/05_data_model.md) - 固定データ、localStorage、設定
- [`docs/04_workflows.md`](docs/04_workflows.md) - 開発・検証・デプロイ手順
