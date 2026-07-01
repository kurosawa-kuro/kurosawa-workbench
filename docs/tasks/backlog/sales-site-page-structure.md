# 営業サイト再設計 — ページ分割・AI相談導線

## 結論

黒澤 Workbench は、トップ 1 枚に情報を詰め込むポートフォリオではなく、**営業導線を持つ AI 相談型サイト**として再設計する。

ベストなページ構成は次の 6 ページ。

```text
/
  トップ。第一印象と分岐だけに絞る

/services
  何を依頼できるか。営業ページの主役

/ai-consult
  黒澤に依頼できそうかを AI に相談する体験ページ

/career
  黒澤の経歴・技術スタック・実績背景

/cases
  案件タイプ別の実績・提供価値

/contact
  問い合わせ・業務委託相談
```

ただし、主役は 6 ページ全部ではない。最初に成立させるべき主役は **3 つ**。

```text
1. /           第一印象と分岐
2. /services   依頼できる内容
3. /ai-consult AI相談体験
```

`/career` と `/cases` は信用補強。`/contact` は最終導線。

## 背景

現状の問題は、トップ 1 枚に次の目的をすべて背負わせようとしていること。

```text
誰なのかを伝える
何を依頼できるかを伝える
実績・技術力を証明する
自社課題に合うか判断させる
問い合わせに進ませる
```

これを 1 ページに詰めると、訪問者の視線が散る。

特にこのサイトには、普通のポートフォリオにはない二軸がある。

```text
黒澤の経歴を見る
黒澤に依頼できるか AI に聞く
```

そのため、トップは説明ページではなく **分岐ハブ** にする。

## 優先順位

ページを増やすこと自体が目的ではない。全部を薄く作るのが一番危ない。

```text
P0
/
/services
/ai-consult

P1
/career
/contact

P2
/cases
```

最初から全ページを完成させない。まず `/services` と `/ai-consult` を営業導線として成立させる。

## ページ責務

### `/`

役割は入口。ここでやることは 3 つだけ。

```text
黒澤は何者か
何を依頼できるか
AI に何を聞けるか
```

トップに置くべき導線は 2 枚カード。

```text
1. 経歴・実績を見る
   AWS / Kubernetes / Web / AI導入支援の実績を見る

2. AIに相談する
   自社の課題に黒澤が合うか、自然文で確認する
```

トップに細かい経歴を全部置かない。詳しく知りたい人は `/career` と `/cases` に送る。

### `/services`

営業ページの主役。`/career` より先に必要。

発注者が最初に知りたいのは「この人が何をしてきたか」よりも、「この人に何を頼めるのか」。

依頼メニュー例:

```text
生成AI導入支援
AI相談・社内ツールPoC
AWS / Kubernetes 基盤設計
Webアプリ開発
技術顧問・レビュー
既存システム改善
```

各メニューには次を出す。

```text
対象の困りごと
提供できること
向いている案件
向いていない案件
相談時に必要な情報
```

ここがあると、単なる職務経歴サイトではなく **営業サイト** になる。

### `/ai-consult`

今回の差別化ポイント。EC 側の「どの商品が適切か分からない」を、ポートフォリオでは次に置き換える。

```text
この人に何を依頼できるか分からない
自社課題に合うか分からない
問い合わせ文をどう書けばいいか分からない
```

ただのチャットでは弱い。AI 回答は構造化して出す。

```text
回答サマリー
対応可能性
関連する経験・スキル
向いている依頼形態
追加で確認したい質問
問い合わせ文の下書き
```

相談例:

```text
AWSとKubernetesの運用改善を相談できますか？
社内向け生成AIツールのPoCを依頼できますか？
Next.jsとGoで業務アプリを作れますか？
技術顧問として月数十時間の相談は可能ですか？
既存システムにAI検索を入れたいです
```

AI EC の成功パターンを転用する。

```text
困りごとテンプレート
自然文入力
3つの提案
理由つき回答
追加質問
問い合わせ文生成
```

### `/career`

信用形成ページ。`/profile` より `/career` を採用する。

`profile` は人物紹介感が強く、発注者目線では弱い。`/career` は経歴・技術背景を証明するページにする。

置くもの:

```text
職務概要
主要スキル
対応領域
案件歴
技術スタック
稼働条件
リモート対応
```

履歴書のような時系列だけでなく、強み別に見せる。

```text
AWS / Kubernetes
生成AI導入
Webアプリ開発
Blockchain / Supply Chain
技術顧問・PoC支援
```

### `/cases`

`/career` と分ける。

```text
/career = 黒澤の背景
/cases  = こういう案件で価値を出せる
```

最初は 4 ケースで十分。

```text
AI導入支援・PoC
AWS / Kubernetes 基盤改善
Webアプリ開発
技術顧問・設計レビュー
```

各ケースはこの形にする。

```text
課題
支援内容
使った技術
成果
向いている相談
```

営業時に「近い相談があるか」を判断しやすいページにする。

### `/contact`

シンプルでよい。ただし `/ai-consult` とつなげる。

理想の流れ:

```text
AI相談結果
↓
問い合わせ文の下書き
↓
/contact に引き継ぎ
```

問い合わせ項目は最小でよい。

```text
会社名
氏名
メール
相談内容
希望する支援内容
稼働開始時期
```

## 画面構成の軸

```text
見せる軸:
  /career
  /cases

売る軸:
  /services
  /contact

体験させる軸:
  /ai-consult

まとめる軸:
  /
```

この分け方を優先する。`/career` を主役にしすぎない。

発注者は職務経歴書を読みたいのではなく、**自社の課題を解決できる人か** を知りたい。営業サイトとしては `/services` と `/ai-consult` が主役。

## データ責務

データはページに直書きしない。後で AI 相談にも流用するため、表示用と AI 入力用を分ける。

```text
src/data/profile.js
  基本プロフィール、肩書き、要約

src/data/services.js
  依頼メニュー、対象課題、提供内容

src/data/skills.js
  技術スタック、経験領域

src/data/cases.js
  実績・案件タイプ

src/data/consultExamples.js
  AI相談例、プロンプトチップ

src/data/aiKnowledge.js
  AIに渡す黒澤の経歴・スキル要約
```

特に `aiKnowledge.js` は分ける。画面表示用の文章と、AI に渡す文章は目的が違う。

## コンポーネント責務

`Top.jsx` に全部詰めない。`Top.jsx` はレイアウトを組むだけにする。

```text
src/components/layout/
  Header
  Footer
  PageShell
  Section

src/components/home/
  Hero
  AxisCards
  ServicePreview
  AiConsultPreview

src/components/services/
  ServiceCard
  ServiceDetailBlock

src/components/career/
  SkillMatrix
  CareerSummary
  TechStackGrid

src/components/consult/
  ConsultInput
  PromptChips
  ConsultResultCard
  InquiryDraftCard

src/components/cases/
  CaseCard
  CaseDetailBlock

src/components/contact/
  ContactForm
```

## 参考元 EC アプリから取り入れること

`ai-ec-shop-sample-app` の EC 機能を移植しない。取り入れるのは、AI 体験と営業導線の設計原則。

```text
AIを検索ではなく「困りごとの相談」として見せる
入力前に相談例を出して心理的ハードルを下げる
AIの回答をカード形式で分かりやすく見せる
理由つきで提案する
追加質問や次のアクションに繋げる
裏側の価値も営業デモとして見せる
デザインに統一感を持たせる
余白と視線誘導を整理する
```

ポートフォリオ側への置換:

```text
EC:
  どの商品が適切か分からない

Portfolio:
  この人に何を依頼できるか分からない
  自社の課題に合う人材か分からない
  どの技術領域に強いか分からない
  問い合わせ文をどう書けばいいか分からない
```

## 実装順序

最初に作るべき画面は `/career` ではなく `/services`。

```text
Step 1
React Router を入れてページを分ける

Step 2
Top.jsx を薄くする
Hero / AxisCards / ServicePreview / AiConsultPreview に分割

Step 3
/services を作る
依頼できる内容をカード化する

Step 4
/ai-consult を作る
EC の AI 相談 UI をポートフォリオ向けに転用する

Step 5
/career を作る
経歴・スキルを整理する

Step 6
/contact を作る
AI 相談結果から問い合わせへつなげる

Step 7
/cases を追加する
実績を案件タイプ別に見せる
```

## 破綻条件

一番危ないのは、ページを増やした結果、全部が薄くなること。

避けること:

```text
トップに全情報を詰め込む
/career を主役にする
AI相談をただのチャットにする
サービスメニューを抽象語だけで終わらせる
データをページ内に直書きして AI 相談へ流用できなくする
```

## 最初に着手すべきタスク

1. React Router を導入し、`/`, `/services`, `/ai-consult` の P0 ルートを作る。
2. `Top.jsx` を分岐ハブに薄くする。
3. `src/data/services.js` と `src/data/consultExamples.js` を作る。
4. `/services` に依頼メニューを実装する。
5. `/ai-consult` に相談例、自然文入力、構造化回答、問い合わせ文下書きを実装する。

この順序を優先する。見た目の磨き込みより、営業導線として「何を頼めるか」と「AIに聞けるか」が伝わることを先に成立させる。
