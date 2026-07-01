import { test, expect } from '@playwright/test'

test('トップページが開き、黒澤俊文の名前が表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('黒澤俊文')
})

test('得意領域セクションが表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#strengths')).toBeVisible()
  await expect(page.locator('.strength-card').first()).toBeVisible()
})

test('キャリア・実績セクションが表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#career')).toBeVisible()
  await expect(page.locator('.career-item').first()).toBeVisible()
})

test('AI 案件相談セクションが表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#consult')).toBeVisible()
  await expect(page.locator('textarea#inquiry')).toBeVisible()
})

test('ヘッダーに「黒澤 Workbench」が表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.header-logo')).toContainText('黒澤')
})
