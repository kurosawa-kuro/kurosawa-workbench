# 職務経歴書 / Résumé – **黒澤 俊文**

- **生年月日** : 1981-02-02(45 歳)
- **居住地** : 札幌(フルリモートのみ可)
- **GitHub** : <https://github.com/kurosawa-kuro>
- **Qiita** : <https://qiita.com/kurosawa_kuro>

---

## 💡 Summary

**GCP AI 基盤整備の専門家**。Vertex AI Pipelines・Vertex Vector Search・BigQuery を中心とした ML 基盤を、**問題定義・要件整理・ヒアリングから PoC・サンプルコード・スライド作成・プレゼンまで一気通貫で担えるリーダー兼コンサルタント**。プログラマーとしての実装力を土台に、現在はチームリーダー・技術コンサルティング業務へ本格シフト中。

- **10+ yrs** : 要件定義・ヒアリング・設計・実装・運用・自動化までを一人称で完遂
- **核となる強み** :
  - 顧客課題の構造化（ヒアリング → 問題分解 → 要件定義 → 技術選定）
  - PoC 設計・サンプルコード実装・スライド作成・プレゼンによる意思決定支援
  - GCP AI 基盤（Vertex AI Pipelines / Vertex Vector Search / Vertex AI Feature Store / BigQuery）の設計・構築・評価
  - メンバーへの GitHub Copilot 活用指導・チームの生成 AI プログラミング定着支援
  - 動画作成によるノウハウ伝授（技術手順・知見をコンテンツ化してチーム展開）
  - 開発ハーネス（CI/CD・テスト・自動化フロー）の整備・設計
  - モデルのパフォーマンス向上以外の全レイヤーを一人で一気通貫で組める実装力
- **直近の取り組み** : 大手製造業向け GCP ベース MLOps パイプライン強化・評価基盤構築をチームリーダーとして推進。問題整理・要件定義・調査・PoC・成果報告（スライド・プレゼン）まで上流工程を主導。並行して BigQuery-first MLOps、Vertex AI Feature Store / Pipelines、Vertex Vector Search の個人検証環境を構築
- **資格・競技**: GCP Professional ML Engineer（取得予定）/ CAPM（PM 資格、取得予定） / Kaggle ブロンズ挑戦中

---

## 🧪 Personal Projects / Technical Validation

案件での意思決定と技術検証を加速させるため、自前の検証環境を整備している。いずれも Port/Adapter 分離により技術要素の差し替えが容易で、評価指標によって「変えて壊れたか」を即座に判定できる。

### bq-first: BigQuery-first MLOps + Vertex Feature Store パイプライン (2026)

> GCP 上で学習 → サービング → 監視 → 自動再学習まで閉じたループを一人で設計・実装。BigQuery / Dataform を offline feature source とし、Vertex AI Feature Store / Feature Group に特徴量を集約することで、学習時特徴量と推論時特徴量の一貫性を担保

**構成**

- BigQuery / Dataform (特徴量マート) → Vertex AI Feature Store / Feature Group → Cloud Run Jobs (training) → GCS artifact → Cloud Run Service (FastAPI serving) → Pub/Sub → BQ Subscription (予測ログ) → Scheduled Query (skew 検知) → Eventarc 経由の自動再学習

**技術的ハイライト**

- Terraform を 4 モジュール (`iam` / `data` / `runtime` / `monitoring`) に分割し、全リソースを IaC で管理
- GitHub Actions と Workload Identity Federation (WIF) による鍵レスデプロイ
- Port/Adapter 分離により ML ロジックを GCP SDK 非依存に保ち、テスト容易性を担保
- BigQuery / Dataform で生成した特徴量を Vertex AI Feature Store / Feature Group に連携し、学習時特徴量と推論時特徴量の一貫性を担保
- Feature parity テストで Dataform SQL ↔ Python ↔ schema.py ↔ BigQuery RECORD 型 ↔ Feature Store schema の一致を静的検知
- 全 130 テスト PASS、ローカル smoke test により GCP 無しでもパイプライン全体を検証可能

**主要技術**: GCP (BigQuery, Vertex AI Feature Store, Vertex AI Feature Group, Cloud Run Service/Jobs, Pub/Sub, Eventarc, Cloud Scheduler, Artifact Registry, Secret Manager) / Terraform / Dataform / LightGBM / FastAPI / Pydantic / uv workspace / GitHub Actions

---

### study-llm-reranking: Elasticsearch ハイブリッド検索 + 学習型リランカー (2026)

> Elasticsearch による BM25 / analyzer ベースの候補検索、multilingual-e5 による意味検索、LightGBM LambdaRank による再ランキングを組み合わせた本番寄りの二段構成検索基盤

**構成**

- Elasticsearch (BM25 / analyzer / synonym による全文検索で候補 100 件取得) → multilingual-e5-large (クエリ埋め込みと物件埋め込みの cosine 類似度) → LightGBM (LambdaRank) による再ランキング
- feedback ログ (click / favorite / inquiry) から学習データを自動生成 → NDCG@10 / MAP / Recall@20 でオフライン評価 → 閾値判定で自動採用/非採用 → 週次再学習の自動実行

**技術的ハイライト**

- Clean Architecture (inbound/outbound Port + UseCase + Domain) による責務分離。Elasticsearch / embedding model / reranker を adapter 単位で差し替え可能な構成を設計
- Elasticsearch の index mapping / analyzer / synonym / scoring を調整し、BM25 候補検索と embedding 類似度、LightGBM LambdaRank の三層で検索品質を改善
- PostgreSQL 10 テーブル (properties / search_logs / property_features / property_embeddings / ranking_compare_logs / offline_eval_reports / kpi_daily_stats / model_adoption_decisions 等) で、検索〜行動ログ〜評価指標〜採用判定までをデータモデルとして閉じさせた設計
- Redis キャッシュのフォールバック方針 (障害時に API を落とさない) をテストで担保
- 日次 (index 同期・特徴量更新・KPI 集計) / 週次 (評価・採用判定・再学習) のバッチを Make ターゲットで整備

**主要技術**: FastAPI / Elasticsearch / multilingual-e5-large / LightGBM (LambdaRank) / PostgreSQL / Redis / Docker Compose / pytest

---

**この 2 つの検証環境が持つ意味**

「どこが本質的に難しく、どこがパターン化できる作業か」を解像度高く語れる状態を維持している。案件で新技術の導入検証依頼があった際、評価指標付きの自前リポジトリで差し替え検証できるため、サイクルタイムを短く保てる。

---

## 🛠 Tech Stack

| 分野 | 主要ツール・サービス |
|---|---|
| **GCP AI 基盤 (主軸)** | Vertex AI Pipelines / Vertex Vector Search / Vertex AI Feature Store / BigQuery / Dataform / Cloud Run Service/Jobs / Pub/Sub / Eventarc / Cloud Scheduler / Artifact Registry / Secret Manager |
| **ML / MLOps** | LightGBM (LambdaRank 含む) / scikit-learn / PyTorch / TensorFlow / MLflow / Kubeflow / KServe / W&B / Great Expectations / multilingual-e5 / ONNX Runtime |
| **Data Engineering** | BigQuery / Dataform / Snowflake / Redshift / Airflow / dbt / Athena / Glue / Firehose / Elasticsearch |
| **Cloud Infrastructure** | GCP (Vertex AI, BigQuery, Cloud Run, Pub/Sub, Eventarc, VPC 等) / AWS (EKS, Lambda, ECS, Fargate, IAM, S3, CloudFront, ALB, Cognito, CodePipeline) / Azure |
| **IaC & Automation** | Terraform / Ansible / CloudFormation / AWS CDK / Workload Identity Federation |
| **Container Orchestration** | EKS / Helm / Argo CD / Kustomize / Operator SDK / kubeadm / kind / git-sync |
| **Database** | PostgreSQL / MySQL / Redis / CloudNativePG |
| **Monitoring & Incident** | Cloud Monitoring (log-based metrics / alert policies) / Prometheus / Grafana / Loki / Tempo / PagerDuty |
| **Backend** | Python (FastAPI, Pydantic, uv, SQLAlchemy) / Go (Gin) / TypeScript (Express, NestJS) / Java (Spring Boot, Micronaut) / Ruby on Rails |
| **Frontend** | TypeScript (React, Next.js, Nuxt) / Tailwind CSS / MSW |
| **Testing & CI/CD** | GitHub Actions (composite actions, WIF) / Playwright / Jest / pytest / TestContainers / LocalStack |
| **GPU Computing** | NVIDIA Device Plugin / TensorRT / Kubernetes GPU Scheduling |
| **Blockchain** | Solidity / Hyperledger Fabric |
| **Dev Tools** | Docker / GitHub / GitLab / Ubuntu (WSL) / Makefile / Doppler |

---

## 📜 Certifications

| 年 | 資格 | ステータス |
|---|---|---|
| 2026 | GCP Professional Machine Learning Engineer | 学習中 (直近取得予定) |
| 2026 | CAPM (Certified Associate in Project Management) | 取得予定 — リーダー・PM 業務へのシフトに向けて |
| 2025 | HashiCorp Terraform Associate | 学習中 |
| 既取得 | AWS Solutions Architect Associate | 取得済 |
| 既取得 | OSS-DB Silver | 取得済 |

**競技データサイエンス**: Kaggle ブロンズ挑戦中（モデリング力・実験管理の実証）

---

## 🧑‍💻 Professional Experience

### 2026-04 – 現在 | フリーランス (チームリーダー / 技術コンサルタント)

**大手製造業向け GCP AI 基盤整備・MLOps パイプライン強化**

GCP ベースの ML 基盤整備をチームリーダー兼技術コンサルタントとして推進。実装だけでなく、上流の課題整理・ヒアリング・要件定義・調査・PoC・成果報告（スライド作成・プレゼン）まで主導。

- **課題整理・ヒアリング・要件定義**: ステークホルダーとの定例ミーティングで課題を構造化し、技術選定・優先順位を合意形成
- **調査・PoC**: Vertex AI Pipelines / Vertex Vector Search の適用可否を実証コードで検証、評価レポートを作成
- **スライド作成・プレゼン**: PoC 結果・アーキテクチャ提案・進捗を経営層・技術チーム向けに資料化して報告
- **生成AI指導（GitHub Copilot）**: メンバーへの GitHub Copilot を活用した AI プログラミング手法の指導・定着支援
- **動画作成によるナレッジ伝授**: 技術ノウハウ・手順を動画コンテンツ化してメンバーへ展開
- **ハーネス整備**: チームの開発ハーネス（CI/CD・テスト・自動化フロー）の設計・整備担当
- Cloud Run / Vertex AI Pipelines を中心とした学習・推論基盤の改善
- BigQuery / Vertex AI Feature Store を前提とした特徴量管理・再学習パイプラインの設計検証
- Terraform による IaC 整備とデプロイフローの改善
- PagerDuty 連携を含む監視・アラート基盤の設計

**主要技術**: GCP (Vertex AI Pipelines / Vertex Vector Search / BigQuery / Vertex AI Feature Store / Cloud Run) / Python / Terraform / PagerDuty

---

### 2025-04 – 2025-12 | フリーランス

**大手 SIer・某省庁向けブロックチェーントレーサビリティシステム PoC**

Hyperledger Fabric ベースのトレーサビリティ基盤 PoC を担当。バックエンド API からインフラまで一人称で実装。

**主要技術**: TypeScript / Next.js / Java (Spring Boot) / AWS / Terraform / Kubernetes / EKS / ActiveMQ

---

### 2025-01 – 2025-03 | 個人開発

**データドリブン EC サービスの PoC**

CloudWatch → Firehose → Glue → Athena → QuickSight のデータパイプラインを構築し、Snowflake への移行を検証。

**主要技術**: TypeScript / Next.js / Go / Rust / AWS CDK / Terraform / Snowflake

---

### 2023-05 – 2024-12 | Wamazing (正社員・バックエンド)

**複数案件のフルスタック担当**

Next.js + Rails / NestJS の複数案件を一人でフルスタック担当。大規模な状態管理リファクタリングを実施。

**主要技術**: TypeScript / Ruby on Rails / NestJS / AWS / Heroku

---

### 2023-02 – 2023-04 | フリーランス

**メタバース系ブロックチェーンゲーム企業のインフラ & DevOps 移行**

VPC / EC2 / FastAPI 環境を Jenkins + Ansible で自動化。

**主要技術**: Python / FastAPI / Jenkins / AWS

---

### 2021-07 – 2022-10 | リモート会議アプリ (受託)

**マイクロサービスの設計・実装**

React + Express のマイクロサービス構成、MySQL バックエンド。予約機能・古データ自動削除を実装し **月間障害ゼロ** を達成。

**主要技術**: TypeScript / React / MySQL / Azure

---

### 2018-07 – 2020-12 | ブロックチェーン企業 (正社員・テックリード)

**ハイブリッド暗号資産ウォレット**

Solidity + Scala + iOS/Android 連携のウォレット基盤をテックリードとして設計・実装。

**主要技術**: Solidity / Scala / Swift / AWS

---

### 2016-11 – 2018-06 | JapanTaxi

**iOS アプリの MVVM 化・社内統合管理システム開発**

**主要技術**: Swift / Ruby on Rails

---

## 🗣 Public Activities

- **Qiita** : 技術記事 100 本超、Udemy インタビュー掲載

---

## 🔗 Links

- Zine Interview : <https://zine.qiita.com/interview/interview_udemy_20170906/>
- Udemy Data Science : <https://zine.qiita.com/products/udemy-datascience/>

<img width="1739" height="755" alt="image" src="https://github.com/user-attachments/assets/1d7e9216-4b3d-4b4f-a9ae-348755a896d9" />

