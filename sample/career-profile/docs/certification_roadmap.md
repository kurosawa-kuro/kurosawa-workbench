# GCP AI 基盤専門家・リーダー / コンサルタントへの転換に向けた資格・プロジェクト学習ロードマップ

**（2026年版 — GCP Professional ML Engineer 最優先）**

---

## 0. 前提の更新

|項目|内容|
|---|---|
|開始時期|**2026年（現在進行中）**|
|既取得資格|**AWS Solutions Architect Associate / OSS-DB Silver**|
|現在のロール|フリーランス チームリーダー / 技術コンサルタント（プログラマーから本格シフト中）|
|週間学習時間|平日 2 h ×5 ＋ 週末 5 h ×2 ＝ **20 h / 週**（案件並行）|
|注力領域|GCP AI 基盤（Vertex AI Pipelines / Vertex Vector Search / BigQuery）＋上流コンサル力（ヒアリング・要件定義・PoC・スライド・プレゼン）|

---

## 1. 年間優先度（2026）

| 優先度 | 資格／プロジェクト | 目標取得時期 | 概算学習時間 | 転職・単価優位性のポイント |
| :-: | --- | --- | --- | --- |
| 🥇1 | **GCP Professional Machine Learning Engineer** | 2026-09 | 60–80 h | Vertex AI Pipelines / Vertex Vector Search / BigQuery の専門性を公式化。リーダー・コンサルタントとしての信頼の担保 |
| 🥇2 | **CAPM（Certified Associate in Project Management）** | 2026-11 | 30–40 h | プログラマーからリーダー・PM へのシフトを公式化。ヒアリング・要件定義・スライド・プレゼンなど上流コンサル力の裏付け |
| 🥈3 | **Terraform Associate** | 2026-12 | 25–30 h | GCP / AWS 環境の IaC を再現可能にし、PoC → 本番移行の摩擦を下げる |
| 4 | **GCP Professional Data Engineer**（任意） | 2027-Q1 | 45–60 h | BigQuery / Dataform の専門性をさらに公式化。データ基盤コンサル案件に刺さる |
| ◯ | **CKA-JP**（任意） | 2027-Q2 以降 | 40–60 h | Kubernetes 基盤が要件になる案件向け。主軸は GCP のため後回し可 |
| ◯ | **Kaggle ブロンズ**（挑戦中） | 2026-12 | 継続 | モデリング力・実験管理の実証。コンサル提案時の「データ分析もわかる」根拠に |

> GCP Professional ML Engineer を取得することで「Vertex AI 基盤の専門家」としての市場認知が一段上がり、単価交渉において「交渉」ではなく「提示」ができる立場になる。

---

## 2. 2026 タイムライン（詳細）

| 期間 | 学習テーマ & アウトプット | 学習 Tips / 重点行動 |
| --- | --- | --- |
| **7 – 8 月** | **GCP Pro ML Engineer 学習** - Vertex AI Pipelines / Feature Store / Vector Search の深掘り - BigQuery ML・Dataform の実践 - PoC サンプルコードを Qiita 記事化 | 現案件の実装と学習を連動させる。実案件で使った Vertex AI の知識を模擬問題に直結 |
| **9 月** | **GCP Pro ML Engineer 受験 → 合格** - 模擬試験 2 周 - Vertex AI Pipelines / Vector Search のハンズオン | 合格後すぐに合格報告記事 + GitHub リポジトリに資格ロゴを掲示 |
| **10 月** | **Terraform Associate** - GCP / AWS 両クラウドで VPC + Cloud Run / Vertex AI リソースを IaC 管理 - GitHub Actions で `plan → apply` 自動化 | コードレビュー習慣：PR に `tflint`, `checkov` を組み込み品質担保 |
| **11 – 12 月** | **コンサル成果物の整備** - PoC 提案スライドのサンプル作成・公開 - ヒアリング〜要件定義テンプレの整備 - Vertex AI Pipelines OSS テンプレートを GitHub に公開 | スライド・プレゼン事例を蓄積しポートフォリオに追加。「要件定義〜PoC〜スライド〜稼働」の一連事例を整理 |
| **2027 Q1 以降** | **GCP Professional Data Engineer**（任意） - BigQuery コスト最適化・Dataform 高度活用 | データ基盤コンサル案件の訴求力をさらに強化したい場合に取得 |

---

## 3. スキルシナジーマップ（更新版）

```
                +-------------+         学習済み
                |  Snowflake  |◀─────────┐
                +------+------┘          │  ELT / CI/CD
                       ▲                 │
                       │ dbt             ▼
  +---------+     +----+----+      +-----------+
  |  k8s    |────▶|  IaC    |─────▶| MLOps     |
  +---------+     +---------+      +-----------+
   ▲  (CKA)        (Terraform)       (Databricks / MLflow)
   │
   │ optional
   ▼
  CKS (任意)
```

- **中心は Snowflake**：データウェアハウスの専門性を示す
    
- **周辺は即戦力スキル**：dbt で変換自動化／IaC で再現性／MLOps で分析循環
    
- **CKS は輪の外側**：求人要件次第で追加
    

---

## 4. 直近 90 日アクションプラン（2025-07～09）

|週|目標|具体タスク|成果物|
|---|---|---|---|
|7月 1-2 週|CKA 範囲把握|killer.sh #1 模試 → スコア分析|弱点メモ（Notion）|
|7月 3-4 週|CKA 認証 & トラブルシュート|etcd backup/restore 演習|GitHub Gist：手順|
|8月 1-2 週|CKA 受験 → 合格|killer.sh #2 ／模試|合格証 ＋ 合格記|
|8月 3-4 週|Terraform 基礎|AWS VPC + EKS サンプル|`iac-eks-basic` Repo|
|9月 1-2 週|Terraform CI/CD|GitHub Actions で plan/apply|`terraform-githubaction` Repo|
|9月 3-4 週|Terraform Associate 試験|模試 → 合格|合格証 ／ 学習ノート|

---

## 5. ポートフォリオ運用指針

- **GitHub**：プロジェクトごとに `demo-*` リポジトリ。必ず _Readme にアーキ図＋前提＋CI/CD 手順_ を記述
    
- **Notion**：資格バッジ・模試スコア推移・課題メモをタイムライン形式で管理
    
- **LinkedIn**：資格取得・主要 PoC 完了ごとに英語ポスト（社名タグ付け）で可視性向上
    

---

### Legend

- 🥇 = 最優先（直接的な転職優位性）
    
- 🥈 = 次優先（差別化要素）
    
- ◯ = 任意（求人条件次第で追加）
    

_Last updated: 2025-06-15 → 2025-07-01_
