import { test, expect } from '@playwright/test';

test.describe('Home Page E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display brand title and tagline in hero section', async ({ page }) => {
    await expect(page).toHaveTitle(/Heshiv Mobility/);
    const heroTitle = page.locator('.hero-title');
    await expect(heroTitle).toContainText('Heshiv Mobility');
    await expect(heroTitle).toContainText('Moving People With Care');
  });

  test('should display trust highlights cards', async ({ page }) => {
    const trustCards = page.locator('.trust-card');
    await expect(trustCards).toHaveCount(4);
    await expect(trustCards.nth(0)).toContainText('Comfortable Travel');
    await expect(trustCards.nth(1)).toContainText('Family Friendly');
  });

  test('should render featured packages and navigate to details', async ({ page }) => {
    const packageCards = page.locator('.package-card');
    await expect(packageCards.first()).toBeVisible();

    const firstCardTitle = await packageCards.first().locator('.card-title').textContent();
    expect(firstCardTitle).toBeTruthy();

    await packageCards.first().locator('a.btn-outline').click();
    await expect(page).toHaveURL(/\/packages\/.+/);
  });
});
