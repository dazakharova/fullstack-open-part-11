import { test, expect } from '@playwright/test';

const API = 'http://localhost:3001/anecdotes';
const TARGET_ID = '25170'; // "Premature optimization..."
const TARGET_TEXT = /^Premature optimization is the root of all evil\.$/i;

test.describe('Anecdotes app', () => {
  test('lists anecdotes from db.json', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/If it hurts, do it more often/i).first()).toBeVisible();
    await expect(page.locator('div', { hasText: TARGET_TEXT }).first()).toBeVisible();
  });

  test('filters anecdotes by input', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('textbox', { name: /filter/i }).fill('optimization');
    await expect(page.locator('div', { hasText: /Premature optimization/i }).first()).toBeVisible();
    await expect(
        page.locator('div', { hasText: /Any fool can write code that a computer can understand/i }).first()
    ).toHaveCount(0);
  });

  test('increments votes for the target anecdote', async ({ page, request }) => {
    const before = await (await request.get(`${API}/${TARGET_ID}`)).json();

    await page.goto('/');

    const contentDiv = page.locator('div', { hasText: TARGET_TEXT }).first();
    const row = contentDiv.locator('xpath=following-sibling::div[contains(., "has")]').first();

    await row.getByRole('button', { name: /vote/i }).click();

    await expect.poll(async () => {
      const after = await (await request.get(`${API}/${TARGET_ID}`)).json();
      return after.votes;
    }, { timeout: 3000, intervals: [200, 300, 500, 1000] }).toBe(before.votes + 1);

    await expect(row).toContainText(/has\s+\d+/i);
  });

  test('adds a new anecdote and cleans up', async ({ page, request }) => {
    const UNIQUE = `New shiny anecdote ${Date.now()}`;

    await page.goto('/');
    await page.getByRole('textbox', { name: /anecdote/i }).fill(UNIQUE);
    await page.getByRole('button', { name: /create/i }).click();

    await expect(page.getByText(UNIQUE).first()).toBeVisible();

    const list = await (await request.get(API)).json();
    const created = list.find(a => a.content === UNIQUE);
    if (created) await request.delete(`${API}/${created.id}`);
  });
});
