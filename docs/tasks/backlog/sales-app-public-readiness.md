# [backlog] 営業用AIアピールアプリ — 公開前品質強化

**起票:** 2026-07-02  
**対象:** `kurosawa-ai-consulting-site`
**目的:** フリーランス営業用の技術アピールアプリとして、公開・商談デモ前に信用を落とす課題を潰す。

## 背景

現状の黒澤 Workbench は、単なるポートフォリオではなく、訪問者が「この人に相談できるか」を AI に聞ける営業サイトとして成立している。

特に `/services` と `/ai-consult` を主役にした導線、Supabase Edge Function 経由の DeepSeek 呼び出し、LLM 前の NG ルール判定、問い合わせ文生成は営業アピールとして強い。

一方で、公開前に残すと「デモ感」「実装の粗さ」に見える課題がある。ここでは、営業投入前に優先して直すものをまとめる。

## 現状評価

営業用技術アピールアプリとしての暫定評価は **78 / 100**。

強み:

- `/services` と `/ai-consult` が主役で、職務経歴ページに寄りすぎていない。
- AI相談がチャットではなく、対応可否・スコープ・リスク・追加質問・問い合わせ文に構造化されている。
- DeepSeek API キーをブラウザに出さず、Supabase Edge Function 経由にしている。
- 常駐・出社必須、薬機法などは LLM 呼び出し前に NG 判定し、コストと誤判定を抑えている。
- Motion / View Transitions / loading UI により、AI機能を体験として見せられている。

弱み:

- 問い合わせ先が `contact@example.com` のまま。
- LLMレスポンスのJSON抽出・正規化が弱く、商談デモ中に崩れるリスクがある。
- AI相談の成功・NG・フォールバック・利用制限を E2E で守れていない。
- ドキュメント上の「プロファイル正本」が実装と一部ズレている。
- READMEで「AI実装上の工夫」を営業向けにまだ十分押し出せていない。

## 優先対応

### P0. 問い合わせ先を一元化して本物に差し替える

現状:

- `app/src/components/ConsultSection.jsx`
- `app/src/pages/Contact.jsx`
- `app/src/components/Footer.jsx`

上記に `contact@example.com` が分散している。

対応:

- 連絡先定数を `app/src/data/engineer-profile.js` または専用 `app/src/data/contact.js` に集約する。
- `mailto:` 生成箇所は集約定数を参照する。
- 公開前に実メールアドレスへ差し替える。

完了条件:

- `rg "contact@example.com" app/src` が 0 件。
- `/contact`、AI相談結果、footer のメールリンクが同じ値を使う。

### P0. AIレスポンスの正規化・フォールバックを強化する

現状:

- `supabase/functions/consult-engineer/index.ts` で LLM 出力から JSON らしき部分を正規表現で抜き、`JSON.parse` している。
- 必須フィールド不足や型崩れに対する補完がない。

対応:

- `fit` を `high | medium | low | ng` に正規化する。
- `canHandle`、`summary`、`suggestedScope`、`risks`、`questions`、`draftInquiry` の型を検証する。
- 欠損時は安全なデフォルトを補う。
- JSONパース失敗時も、直接問い合わせ導線に落とす。
- 可能なら DeepSeek 側に JSON object 形式を要求できるか確認し、利用可能なら導入する。

完了条件:

- 壊れた LLM レスポンスでも Edge Function が 500 を返さず、UIが表示可能なフォールバックJSONを返す。
- NGルール判定の戻り値も同じ ConsultResult 形に揃う。

### P1. AI相談のE2Eを追加する

現状:

- `app/e2e/routes.spec.js` はルート表示と主要導線確認が中心。
- AI相談結果の表示、NG判定、API失敗、利用制限は検証していない。

対応:

- Supabase Function 呼び出しを Playwright で mock する。
- high / medium などの成功結果が画面に表示されることを確認する。
- 常駐・出社必須などの NG 入力で `対応外` が表示されることを確認する。
- API失敗時に「直接お問い合わせ」へ誘導することを確認する。
- `__AI_DAILY_LIMIT__` 到達時のエラー表示を確認する。

完了条件:

- AI相談の主要状態が E2E で守られている。
- `npx playwright test` が安定して通る。

### P1. ドキュメントの正本表現を修正する

現状:

- `docs/01_requirements.md` では「黒澤プロファイルの正本は `app/src/data/engineer-profile.js`」と書かれている。
- 実装上、AI判定用の正本は `supabase/functions/_shared/engineer-profile.ts`。

対応:

- 画面表示用正本: `app/src/data/engineer-profile.js`
- AI判定用正本: `supabase/functions/_shared/engineer-profile.ts`

上記のように、用途別の正本として docs を修正する。

完了条件:

- `docs/01_requirements.md`、`docs/02_architecture.md`、README の説明が実装と一致している。

### P1. READMEに「AI実装上の工夫」を追加する

現状:

- READMEはページ構成と技術スタックを説明できているが、営業向けの技術アピールとしてはAI実装の工夫が薄い。

追加したい内容:

- Edge Function 経由で APIキーを隠している。
- LLM 前に NG ルールを判定している。
- JSONレスポンスを正規化してUIに接続している。
- AI障害時は直接問い合わせへ落とす。
- ブラウザ単位の日次利用制限でコストを抑える。
- Playwright E2EでAI相談導線を検証する。

完了条件:

- README冒頭から「AI案件相談を実装した営業サイト」であることが伝わる。
- 技術面接・商談で話せる実装上の工夫が箇条書きで説明されている。

## 非スコープ

- Contactフォームのバックエンド保存
- 認証付き管理画面
- CMS / Notion / 外部DB連携
- 実績ページの大幅増築
- デザインテーマの全面変更

## 推奨順

1. 問い合わせ先一元化
2. AIレスポンス正規化
3. AI相談E2E追加
4. docs正本表現修正
5. READMEの営業向けAI実装説明追加

## 完了後の期待状態

営業相手に対して、次を自然に説明できる状態にする。

```text
このサイトは、単なる職務経歴ページではありません。
案件概要をAIが黒澤のスキル・NG条件と照合し、
相談可否、想定スコープ、追加質問、問い合わせ文まで生成します。

実装面では、APIキーをEdge Function側に閉じ、
NGルールをLLM前に判定し、フォールバックと利用制限も入れています。
```
