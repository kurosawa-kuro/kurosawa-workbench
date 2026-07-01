import { test, expect } from '@playwright/test'

test('Hero の「AI に案件を相談する」ボタンが #consult へスクロールする', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /AI に案件を相談する/ }).click()
  await expect(page.locator('#consult')).toBeInViewport({ timeout: 3000 })
})

test('Hero の「実績を見る」ボタンが #career へスクロールする', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: '実績を見る' }).click()
  await expect(page.locator('#career')).toBeInViewport({ timeout: 3000 })
})

test('得意領域カードが 6 枚（strength:high）表示される', async ({ page }) => {
  await page.goto('/')
  const highCards = page.locator('.strength-badge--high')
  await expect(highCards).toHaveCount(6)
})

test('キャリア項目が複数表示される', async ({ page }) => {
  await page.goto('/')
  const items = page.locator('.career-item')
  const count = await items.count()
  expect(count).toBeGreaterThanOrEqual(4)
})

test('フッターに黒澤 Workbench が表示される', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.footer-logo')).toContainText('黒澤 Workbench')
})
