import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => localStorage.clear())
})

test('AI 相談フォームでフォールバック表示される（AI 障害時）', async ({ page }) => {
  await page.route('**/functions/v1/consult-engineer', (route) => route.abort())

  await page.goto('/#consult')
  await page.locator('textarea#inquiry').fill('Vertex AI Pipelines を使った MLOps 基盤を構築したい')
  await page.getByRole('button', { name: 'AI に相談する' }).click()

  await expect(page.getByText(/AI が応答できません|直接お問い合わせ/)).toBeVisible({ timeout: 8000 })
})

test('AI 相談フォームで NG 案件を入力すると fit:ng が返る（ルール判定）', async ({ page }) => {
  await page.route('**/functions/v1/consult-engineer', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        fit: 'ng',
        canHandle: false,
        summary: 'フルリモートのみ対応しているため、常駐・出社必須の案件はお受けできません。',
        suggestedScope: [],
        risks: [],
        questions: [],
        draftInquiry: '',
      }),
    })
  })

  await page.goto('/#consult')
  await page.locator('textarea#inquiry').fill('常駐必須のシステム開発')
  await page.getByRole('button', { name: 'AI に相談する' }).click()

  await expect(page.locator('.fit-badge--ng')).toBeVisible({ timeout: 8000 })
  await expect(page.locator('.fit-badge-label')).toContainText('対応外')
})

test('AI 相談で fit:high が返るとスコープとコピーボタンが表示される', async ({ page }) => {
  await page.route('**/functions/v1/consult-engineer', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        fit: 'high',
        canHandle: true,
        summary: 'Vertex AI Pipelines + BigQuery の MLOps 基盤整備は主力領域です。',
        suggestedScope: ['ヒアリング・要件整理', 'Vertex AI Pipelines 設計'],
        risks: ['フルリモート専門のため出社不可'],
        questions: ['GCP プロジェクトはすでにありますか？'],
        draftInquiry: 'Vertex AI Pipelines での MLOps 基盤整備をご相談したいです。',
      }),
    })
  })

  await page.goto('/#consult')
  await page.locator('textarea#inquiry').fill('Vertex AI Pipelines で MLOps を構築したい')
  await page.getByRole('button', { name: 'AI に相談する' }).click()

  await expect(page.locator('.fit-badge--high')).toBeVisible({ timeout: 8000 })
  await expect(page.locator('.scope-list li').first()).toBeVisible()
  await expect(page.getByRole('button', { name: /コピー/ })).toBeVisible()
})

test('draftInquiry のコピーボタンが機能する', async ({ page }) => {
  await page.route('**/functions/v1/consult-engineer', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        fit: 'high',
        canHandle: true,
        summary: '対応可能です。',
        suggestedScope: ['要件整理'],
        risks: [],
        questions: [],
        draftInquiry: 'テスト用の問い合わせ文です。',
      }),
    })
  })

  await page.goto('/#consult')
  await page.locator('textarea#inquiry').fill('MLOps 基盤を構築したい')
  await page.getByRole('button', { name: 'AI に相談する' }).click()

  await expect(page.getByRole('button', { name: /コピー/ })).toBeVisible({ timeout: 8000 })
  await page.getByRole('button', { name: /コピー/ }).click()
  await expect(page.getByRole('button', { name: /コピー済み/ })).toBeVisible()
})
