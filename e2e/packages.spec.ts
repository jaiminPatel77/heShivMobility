import { test, expect } from '@playwright/test';

test.describe('Package Search & Filtering E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/packages');
  });

  test('should filter packages by category tab', async ({ page }) => {
    await page.click('button.tab-btn:has-text("Pilgrimage")');
    const cards = page.locator('.package-card');
    await expect(cards.first()).toBeVisible();
    await expect(cards.first().locator('.category-badge')).toHaveText('Pilgrimage');
  });

  test('should search packages by destination input', async ({ page }) => {
    await page.fill('.search-input', 'Kutch');
    const cards = page.locator('.package-card');
    await expect(cards.first()).toContainText('Kutch');
  });
});
