import { test, expect } from '@playwright/test'

const routes = [
  { path: '/', heading: /AI導入とクラウド実装/ },
  { path: '/services', heading: '依頼できる内容' },
  { path: '/ai-consult', heading: 'この案件、黒澤に相談できますか？' },
  { path: '/career', heading: '黒澤俊文' },
  { path: '/cases', heading: '案件タイプ別の提供価値' },
  { path: '/contact', heading: '問い合わせ・業務委託相談' },
]

for (const { path, heading } of routes) {
  test(`${path} が開く`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator('h1')).toHaveText(heading)
  })
}

test('トップから主要導線に進める', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /依頼できる内容を見る/ }).click()
  await expect(page).toHaveURL(/\/services$/)

  await page.goto('/')
  await page.getByRole('link', { name: /AIに相談する/ }).first().click()
  await expect(page).toHaveURL(/\/ai-consult$/)
})

test('AI相談ページに相談例と入力フォームが表示される', async ({ page }) => {
  await page.goto('/ai-consult')
  await expect(page.getByText('社内向け生成AIツールのPoCを依頼できますか？').first()).toBeVisible()
  await expect(page.locator('textarea#inquiry')).toBeVisible()
})
