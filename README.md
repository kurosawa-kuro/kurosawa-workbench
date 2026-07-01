# 黒澤 Workbench

黒澤俊文のフリーランスエンジニア営業サイト。

## コンセプト

企業ホームページにある「このサービスで対応できますか？」AI QA の、**黒澤個人特化版**。

訪問者はよくこんな状態で来る:
- この人に相談していい案件なのか分からない
- 技術的に合っているのか分からない
- どこまで任せられるのか分からない
- 問い合わせ文を書くのが面倒

そこに AI QA が入ることで障壁を取り除き、整理済みの問い合わせへ誘導する。

## AI 案件相談（目玉機能）

「この案件、黒澤に相談できますか？」

案件概要を入力すると AI が返す:

| 返答項目 | 内容 |
|---|---|
| 対応可否・得意度 | high / medium / low / ng |
| 想定スコープ | 要件整理・Vertex AI Pipelines 設計・Cloud Run サービング 等 |
| リスク・注意点 | フルリモート専門 / スコープ要調整 等 |
| 追加確認事項 | GCP プロジェクトはありますか？ 等 |
| 問い合わせ文 | そのままコピーして送れる整形済みテキスト |

常駐・出社必須などの絶対 NG はルールで即判定し、LLM を呼ばない。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フレームワーク | React 19 + Vite 8 |
| インフラ | Cloudflare Pages / Supabase Edge Functions |
| AI | DeepSeek API（Supabase Secrets 経由、ブラウザ非公開） |

## セットアップ

```bash
make setup    # 依存取得 + ビルド
make dev      # 開発サーバー起動 (http://localhost:5173)
make build    # 本番ビルド
```

## ドキュメント

- [`docs/01_requirements.md`](docs/01_requirements.md) — 目的・ユースケース・制約
- [`docs/02_architecture.md`](docs/02_architecture.md) — 構成・判定フロー・Edge Function I/O
