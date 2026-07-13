.PHONY: setup build run dev test debug fmt lint clean fn-deploy fn-logs keepalive-install keepalive-types keepalive-test keepalive-check keepalive-dev keepalive-secret keepalive-deploy keepalive-tail

# Application
APP_NAME := kurosawa-ai-consulting-site
SRC_DIR  := app
KEEPALIVE_DIR := ops/supabase-keepalive

# 初期セットアップ (依存取得・ビルド)
setup: deps build
	@echo "Setup complete."

deps:
	cd $(SRC_DIR) && npm install

# ビルド
build:
	cd $(SRC_DIR) && npm run build

# Cloudflare Pages デプロイ (CLOUDFLARE_API_TOKEN 環境変数が必要)
deploy:
	cd $(SRC_DIR) && wrangler pages deploy dist --project-name kurosawa-workbench --commit-dirty=true

# 実行 (ビルド済み成果物をプレビュー)
run:
	cd $(SRC_DIR) && npm run preview

# 開発 (ホットリロード)
dev:
	cd $(SRC_DIR) && npm run dev

# Playwright E2E
test:
	cd $(SRC_DIR) && npx playwright test

# Playwright デバッグ (ブラウザを開いて目視確認)
debug:
	cd $(SRC_DIR) && npx playwright test --headed

# Playwright UI モード (インタラクティブデバッグ)
debug-ui:
	cd $(SRC_DIR) && npx playwright test --ui

# 整形
fmt:
	cd $(SRC_DIR) && npx prettier --write "src/**/*.{js,jsx}"

# 静的解析
lint:
	cd $(SRC_DIR) && npm run lint

# Edge Functions デプロイ (supabase login 済みであること)
fn-deploy:
	supabase functions deploy consult-engineer

# Edge Functions ログ確認
fn-logs:
	supabase functions logs consult-engineer --tail

# Shared Supabase keep-alive Worker (also covers lumiere-select)
keepalive-install:
	cd $(KEEPALIVE_DIR) && npm install

keepalive-types:
	cd $(KEEPALIVE_DIR) && npm run cf-typegen

keepalive-test:
	cd $(KEEPALIVE_DIR) && npm test

keepalive-check:
	cd $(KEEPALIVE_DIR) && npm run check

keepalive-dev:
	cd $(KEEPALIVE_DIR) && npm run dev

# Interactive: paste the Supabase anon key when prompted. Never pass it as a CLI argument.
keepalive-secret:
	cd $(KEEPALIVE_DIR) && npx wrangler secret put SUPABASE_ANON_KEY

keepalive-deploy:
	cd $(KEEPALIVE_DIR) && npm run deploy

keepalive-tail:
	cd $(KEEPALIVE_DIR) && npx wrangler tail shared-supabase-keepalive

# クリーンアップ
clean:
	rm -rf $(SRC_DIR)/dist $(SRC_DIR)/node_modules
