# High-End Review Pack

Review this Decision Catalog Draft as a hard critic of catalog quality. Do not read the full repo; use only the model-facing draft content. Machine provenance stays in sidecars.

Mandatory review lenses:
- Is each meaning grounded in its paired fact and useful for high-end model judgment or new feature ideation?
- Are there important coverage holes in files, grep categories, entrypoints, env/config, dependencies, or change signals?
- Does each `meaning.role` match what the evidence shows the file or item is?
- Do `meaning.current_implication` entries stay descriptive and current-state only?
- Is inference or risk language leaking into `fact`?
- Is any advice, recommendation, next action, validation plan, rollback plan, or change boundary present?

## Draft Under Review

review_status: draft

id: kurosawa-workbench_decision_catalog_v1
domain: web application (frontend + Supabase edge functions)
confidence: high
confidence_policy: capped_to_high (freshness=fresh, catalog_items=7, distinct_evidence_artifacts=34)
evidence_freshness: high
coverage_confidence: high
meaning_quality: medium
high_end_ready: medium

# Decision Catalog (Draft)

fact_source: non_llm_scan
evidence_run_id: 20260705T052152Z_9b03d7722a7c
machine_provenance: docs/catalog/evidence/evidence_index.jsonl

## scan_summary

### manifest_counts
- summary: スキャンは最新コミットで実行され、言語プロファイルに css, html, infra, node, typescript を検出。含まれるファイル数は 141、抽出シンボルは 430、テスト数は 2、エントリポイント数は 2 と報告されている。

### static_signal_counts
- summary: 静的シグナル集計では auth_permission（86）、env_secret（50）、job_lifecycle（36）、infra_surface（12）など多数ヒットが報告されている。これらはキー語ベースの静的ヒットであり、語彙依存であることに留意。

### grep_and_parser_limitations
- summary: grep の no-hit は不存在の証明ではないと明示されている。パーサ制約やヒューリスティック抽出の限界があるため、一部のシンボルや設定は検出対象外となり得る。

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
- 事実: React コンポーネント ConsultSection と関連関数（handleSubmit, handleCopy, setField, stateOf, ConsultPipeline, ConsultResult 等）が存在する。handleSubmit は非同期関数として記録され、パイプライン表示用の PIPELINE_STAGES といった構成要素が定義されている。
- 意味あい:
  - 役割: フロントエンドの相談パイプライン UI コンポーネント（フォーム送信 → ステータス遷移 → 結果表示）
  - 含意: 相談フォームの入力から AI レスポンス表示までを管理するフロントエンドの主要なオーケストレータである。
  - 含意: 非同期の送信処理（handleSubmit）があり、外部 API への問い合わせや状態管理の流れが含まれる想定が妥当である。
  - confidence: high

### app/src/lib/aiLimit.js  {subject_kind: module}
- 事実: AiLimitExceededError クラスと consumeAiLimit, getAiUsageToday といった関数が lib 層にあり、vite.config.js 側に日次上限（AI_DAILY_LIMIT 相当）の設定がある。
- 意味あい:
  - 役割: AI 利用量管理（クライアント／アプリ内利用制御ロジック）
  - 含意: AI 呼び出しに対する日次の利用上限管理がアプリケーション設計に組み込まれている。
  - 含意: 利用上限超過時のエラー型（AiLimitExceededError）を用意することで、過負荷や課金上限制御を想定したハンドリング経路が存在する。
  - confidence: high

### supabase/functions/consult-engineer/index.ts  {subject_kind: entrypoint}
- 事実: クライアント側に consultEngineer を呼ぶ supabase ラッパーがあり、サーバー側は supabase/functions/consult-engineer/index.ts（DEEPSEEK_MODEL, MAX_INQUIRY_LENGTH, CORS, FALLBACK, SYSTEM_PROMPT 等の構成が観測される）として API ハンドラが存在する。
- 意味あい:
  - 役割: サーバー側の相談ハンドラ（Edge Function）
  - 含意: フロントエンドの相談送信は Supabase Edge Function を経由して処理される設計である。
  - 含意: サーバー側でモデル選択や問い合わせ長の制限、CORS 設定、フォールバック処理やシステムプロンプトを含む仕立てがなされていることを示す。
  - confidence: high

### app/src/index.css  {subject_kind: file}
- 事実: app/src/index.css に多数のカスタムプロパティ（--paper, --ink, --blueprint, --fit-high/--fit-medium/--fit-low, --sp-*, --maxw, --radius, --shadow, --font-* 等）が定義されている。
- 意味あい:
  - 役割: アプリ全体のデザインシステム（CSS トークン定義）
  - 含意: デザイントークンと見なせる体系的なカスタムプロパティ群が存在し、UI の一貫したテーマ・状態表現（fit 系の指標やスペーシング・フォント・シャドウ）を支えている。
  - 含意: フロントエンドは一貫したスタイル設計を前提に構築されている可能性が高い。
  - confidence: high

### VITE_SUPABASE_ANON_KEY / VITE_SUPABASE_URL  {subject_kind: env}
- 事実: 環境変数 VITE_SUPABASE_ANON_KEY と VITE_SUPABASE_URL が app/src/lib/supabase.js で参照されている（値は赤acted）。requiredness はスキャン結果で未確定と記録されている。
- 意味あい:
  - 役割: Supabase クライアント初期化用のランタイム設定（環境変数）
  - 含意: Supabase クライアントの初期化に必要な環境参照が組み込まれており、実行環境でこれらの変数の供給が想定される。
  - 含意: スキャンでは requiredness が未判定のため、実際の必須性やデフォルトは証拠の範囲で確定していない。
  - confidence: medium

### app/package.json  {subject_kind: dependency}
- 事実: 依存関係情報がスキャンで抽出されており（dependency inventory が生成されている）、フロントエンド Node/TypeScript ランタイム向けのパッケージ管理が存在する（app/package.json 等がリポジトリにある）。
- 意味あい:
  - 役割: フロントエンドの依存関係（package manifest）
  - 含意: プロジェクトは Node ベースのフロントエンド依存を持ち、依存関係の一覧がスキャンで取得されている。
  - 含意: 依存性はビルド・実行に関わる要素としてソース管理下にあると報告されている。
  - confidence: high

### test_surface  {subject_kind: test_surface}
- 事実: テスト関連の証拠があり（scan が test_count: 2 を報告）、app/test-results/.last-run.json 等のテスト成果物やテストファイルがリポジトリ内に存在する。
- 意味あい:
  - 役割: リポジトリに含まれるテスト表面（実行結果ファイルとテストケース）
  - 含意: 少数ながらテストが存在し、CI/ローカルでの実行履歴を示す成果物がリポジトリに含まれている。
  - 含意: テストはコードの一部振る舞いを自動検証する仕組みを持つことを示すが、カバレッジや対象範囲はスキャン証拠だけでは特定できない。
  - confidence: medium

## evidence_appendix

### static_signals_summary
- summary: 静的シグナル解析で auth_permission（86 ヒット）と env_secret（50 ヒット）、job_lifecycle（36 ヒット）、infra_surface（12 ヒット）、high_risk_ops（6 ヒット）などの検索ヒットが報告されている。これらは語彙依存の静的観測であり、検出は潜在的な注目点を示すにとどまる。

### parser_and_search_limitations
- summary: シンボル抽出は行ベースのヒューリスティックであり、マクロや動的生成、複数行シグネチャは取りこぼす可能性がある。grep の no-hit は不存在の証明ではない。

### scan_manifest_summary
- summary: スキャンは最新コミットに対して実行され、141 ファイルを含む検出、430 シンボル抽出、2 テスト、2 エントリポイントの報告がある。coverage_warnings により一部の拡張子（example, local, png, sh, svg, toml）が検査対象外だった旨が記録されている。

### env_redaction_and_status
- summary: 環境変数（VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL）が参照として検出され、値は赤acted されている。redaction レポートは値の多くが置換済みであることを示すが、環境変数の必須性はスキャンで未確定とされる。
