# [backlog] 黒澤 Workbench — 未確定論点・判断待ちリスト

**起票:** 2026-06-29 / **最終更新:** 2026-06-29  
**関連仕様:** `docs/01_requirements.md` / `docs/02_architecture.md`

---

## ✅ 解決済み

| 論点 | 決定内容 | 根拠 |
|---|---|---|
| プロジェクトの目的・コンセプト | 企業HPのAI QA の黒澤個人版。案件相談FAQ + 初回ヒアリング自動化 | `docs/01_requirements.md` |
| EC デモの扱い | このプロジェクトでは不要。コードは残存するが docs から除外済み | ユーザー確認済み |
| AI レスポンス スキーマ | fit / canHandle / summary / suggestedScope / risks / questions / draftInquiry | `docs/02_architecture.md` |
| 黒澤プロファイルデータ | `app/src/data/engineer-profile.js` に構造化済み。`buildSystemPrompt()` で system prompt 生成 | ファイル作成済み |
| 問い合わせ導線（MVP） | draftInquiry コピー + mailto: リンク。Contact バックエンド不要 | `docs/01_requirements.md` |
| NG 判定方式 | 常駐・出社必須等はルールで即判定し LLM を呼ばない | `docs/02_architecture.md` |
| フリーランス単価 | 月 90〜130 万円 | `docs/01_requirements.md` |

---

## 🔴 実装前に owner 決定が必要

### 1. 問い合わせ先メールアドレス ✅ ダミーで進める

- 実装時: `contact@example.com` をダミーとして使用
- 公開前に実アドレスへ差し替える（`engineer-profile.js` の `contactEmail` フィールド 1 箇所のみ更新）

---

### 2. サイトデザインテーマ ✅ 決定

**ビジネス基調 × 最新技術・未来・ワクワク感**

- **ベース**: ダーク（深いネイビー / チャコール系）
- **アクセント**: シアン / エレクトリックブルー（AI・Kubernetes・Blockchain の技術感）
- **雰囲気参考**: Vercel / Supabase / Linear — モダン・クリーン・テックダーク
- **演出**: グロー・グラデーション・グリッドなど未来感を加味。やりすぎず、ビジネスサイトとして成立させる
- **実装**: Pico.css dark theme + `app/src/index.css` カスタム CSS

---

### 3. デプロイ先 URL / Cloudflare Pages プロジェクト名

`env/config.yaml` の `pagesUrl` / `deploy.pagesUrl` が現状 `lumiere-select.pages.dev` のまま。

- 新しい Cloudflare Pages プロジェクト名と URL を確定させる
- 確定後: `env/config.yaml` + `Makefile` の deploy コマンドを更新

---

## 🟡 後続フェーズ（今回スコープ外・保留）

| 論点 | 状況 |
|---|---|
| 実績ポートフォリオページ | 後続フェーズ。掲載形式（静的 JS / Notion API / CMS）は未決定 |
| About ページ | 後続フェーズ |
| Contact フォームのバックエンド送信 | 後続フェーズ。MVP は mailto: で十分 |
| X / GitHub / Wantedly 等の外部リンク配置 | 後続フェーズ |

---

## 🔵 実装タスク候補（未着手）

仕様は確定済み。実装前に `docs/tasks/active/` へ task を作ること。

| タスク | 依存 |
|---|---|
| `consult-engineer` Edge Function 実装 | engineer-profile.js 完成済み |
| AI 相談フォーム UI（React ページ）実装 | Edge Function 実装後 |
| NG ルール判定ロジックの実装（Edge Function 内） | Edge Function 実装と同時 |
| サイトデザインテーマ適用 | テーマ決定後（🔴 #2） |
| Cloudflare Pages 再デプロイ設定 | URL 確定後（🔴 #3） |
| EC デモコードの archive / 削除 | owner 判断次第 |
