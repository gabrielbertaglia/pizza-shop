import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Próxima página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 11', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Customer 20', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 51', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Customer 60', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Página Anterior' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 41', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Customer 50', exact: true }),
  ).toBeVisible()

  await page.getByRole('button', { name: 'Primeira página' }).click()

  await expect(
    page.getByRole('cell', { name: 'Customer 1', exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('cell', { name: 'Customer 10', exact: true }),
  ).toBeVisible()
})

test('filters by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filter resultados' }).click()

  await expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})

test('filters by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 11')
  await page.getByRole('button', { name: 'Filter resultados' }).click()

  await expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})

test('filters by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()

  await page.getByRole('button', { name: 'Filter resultados' }).click()

  const tableRows = await page.getByRole('cell', { name: 'Pendente' }).all()

  await page.waitForTimeout(1000)

  expect(tableRows).toHaveLength(10)
})