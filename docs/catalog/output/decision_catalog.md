review_status: adopted
id: kurosawa-workbench_decision_catalog_v1
domain: web application (frontend + Supabase edge functions)
confidence: high

# Decision Catalog

fact_source: non_llm_scan
evidence_run_id: 20260705T052152Z_9b03d7722a7c
machine_provenance: docs/catalog/evidence/evidence_index.jsonl

purpose: upper_model_input
catalog_id: kurosawa-workbench_decision_catalog_v1
domain: web application (frontend + Supabase edge functions)
high_end_ready: medium

## repo_topology

- kind: software_project
- core_files:
- runtime_surfaces:
  - CLI arguments
- data_surfaces:
  - repo object state surfaces

## coverage_map

- scan_included_files: 141
- topology_files: 0
- catalog_core_items: 7
- covered_as_core:
  - app/src/components/ConsultSection.jsx
  - app/src/lib/aiLimit.js
  - supabase/functions/consult-engineer/index.ts
  - app/src/index.css
  - VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_URL
- covered_as_appendix:
  - app/package.json
  - test_surface
- omitted_or_low_signal:
  - reason: generated/vendor/test fixture/low-signal or scan metadata only

## scan_summary

- profile: infra+web
- profile_resolution: requested=auto detected=css,html,infra,node,typescript profiles_run=infra+web language=infra+web
- scan_included_files: 141
- symbols: 430
- entrypoints: 2
- tests_detected: 2
- high_risk_ops_hits: 6
- no_hit_is_not_absence: true

## flow_items

### primary_task_lifecycle_candidate  {subject_kind: evidence_inferred_flow}
- id: primary_task_lifecycle_candidate
- flow_type: primary_candidate
- grounding_level: weak
- basis:
  - app/src/components/ConsultSection.jsx
  - app/src/lib/supabase.js
  - supabase/functions/consult-engineer/index.ts
  - app/src/lib/aiLimit.js
- steps:
  - order: 1
    user_intent: 相談用のテキストやオプションを入力して送信準備を行う
    surface: candidate request preparation (フォーム入力／ステータス遷移)
    components: app/src/components/ConsultSection.jsx, app/src/pages/AiConsult.jsx
    data_effect: ユーザー入力がフォーム状態として保持され、相談送信のトリガー準備が整う（ローカル state が更新される）。
    confidence: medium
  - order: 2
    user_intent: 送信前に AI 利用上限の有無を確認する（上限超過で送信抑止）
    surface: candidate quota check
    components: app/src/components/ConsultSection.jsx, app/src/lib/aiLimit.js
    data_effect: 送信前に利用上限チェック（consumeAiLimit/getAiUsageToday）やクライアント側のエラー型生成（AiLimitExceededError）による早期ブロックが行われうる。
    confidence: medium
  - order: 3
    user_intent: 入力内容をサーバーに送り、AI 応答を取得する
    surface: candidate consult submission (client → edge function)
    components: app/src/lib/supabase.js, supabase/functions/consult-engineer/index.ts
    data_effect: フロントエンドから Supabase Edge Function へ問い合わせが発行され、サーバー側でモデル選択・入力長チェック・CORS/フォールバック等の処理が走る想定のリクエスト／レスポンスが発生する。
    confidence: weak
  - order: 4
    user_intent: 送信した問い合わせに対する AI 応答を生成させる
    surface: candidate server-side generation and assembly
    components: supabase/functions/consult-engineer/index.ts, supabase/functions/__shared_engineer_profile.ts
    data_effect: サーバー側でシステムプロンプトやモデル指定に基づく生成が行われ、レスポンスが構築される（MAX_INQUIRY_LENGTH 等の制約が適用される）。
    confidence: weak
  - order: 5
    user_intent: AI 応答を画面で確認し、必要に応じて履歴保存やコピーなどの二次操作を行う
    surface: candidate result rendering and pipeline update
    components: app/src/components/ConsultSection.jsx, app/src/components/ConsultResult.jsx
    data_effect: 取得した応答がフロントエンドに返り、ConsultSection/ConsultResult を通じて画面表示およびパイプライン上のステータス更新が行われる。
    confidence: medium
- cannot_conclude:
  - フロントエンドからサーバーへの実際のネットワーク呼び出し順序やエラー再試行の詳細なコールグラフは抽出証拠に明示されていないため、厳密な実行パスは断定できない（call graph が未提供）。
  - CLI 風のコマンド名や外部ジョブスケジューラ経由の自動化有無は観測証拠で確認できないため、ユーザー操作の全面的な一覧ではない。

## catalog_items

### app/src/components/ConsultSection.jsx  {subject_kind: file}
- role: フロントエンドの相談パイプライン UI コンポーネント（フォーム送信 → ステータス遷移 → 結果表示）
- implications:
  - 相談フォームの入力から AI レスポンス表示までを管理するフロントエンドの主要なオーケストレータである。
  - 非同期の送信処理（handleSubmit）があり、外部 API への問い合わせや状態管理の流れが含まれる想定が妥当である。

### app/src/lib/aiLimit.js  {subject_kind: module}
- role: AI 利用量管理（クライアント／アプリ内利用制御ロジック）
- implications:
  - AI 呼び出しに対する日次の利用上限管理がアプリケーション設計に組み込まれている。
  - 利用上限超過時のエラー型（AiLimitExceededError）を用意することで、過負荷や課金上限制御を想定したハンドリング経路が存在する。

### supabase/functions/consult-engineer/index.ts  {subject_kind: entrypoint}
- role: サーバー側の相談ハンドラ（Edge Function）
- implications:
  - フロントエンドの相談送信は Supabase Edge Function を経由して処理される設計である。
  - サーバー側でモデル選択や問い合わせ長の制限、CORS 設定、フォールバック処理やシステムプロンプトを含む仕立てがなされていることを示す。

### app/src/index.css  {subject_kind: file}
- role: アプリ全体のデザインシステム（CSS トークン定義）
- implications:
  - デザイントークンと見なせる体系的なカスタムプロパティ群が存在し、UI の一貫したテーマ・状態表現（fit 系の指標やスペーシング・フォント・シャドウ）を支えている。
  - フロントエンドは一貫したスタイル設計を前提に構築されている可能性が高い。

### VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_URL  {subject_kind: env}
- role: Supabase クライアント初期化用のランタイム設定（環境変数）
- implications:
  - Supabase クライアントの初期化に必要な環境参照が組み込まれており、実行環境でこれらの変数の供給が想定される。
  - スキャンでは requiredness が未判定のため、実際の必須性やデフォルトは証拠の範囲で確定していない。

### app/package.json  {subject_kind: dependency}
- role: フロントエンドの依存関係（package manifest）
- implications:
  - プロジェクトは Node ベースのフロントエンド依存を持ち、依存関係の一覧がスキャンで取得されている。
  - 依存性はビルド・実行に関わる要素としてソース管理下にあると報告されている。

### test_surface  {subject_kind: test_surface}
- role: リポジトリに含まれるテスト表面（実行結果ファイルとテストケース）
- implications:
  - 少数ながらテストが存在し、CI/ローカルでの実行履歴を示す成果物がリポジトリに含まれている。
  - テストはコードの一部振る舞いを自動検証する仕組みを持つことを示すが、カバレッジや対象範囲はスキャン証拠だけでは特定できない。

## evidence_appendix

- pointer: docs/catalog/evidence/evidence_index.jsonl
- pointer: docs/catalog/evidence/current_run_id
