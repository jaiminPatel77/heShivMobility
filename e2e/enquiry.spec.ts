import { test, expect } from '@playwright/test';

test.describe('Enquiry Form E2E Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/enquiry');
  });

  test('should show validation error messages on invalid submit', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('.field-error').first()).toBeVisible();
  });

  test('should submit enquiry form successfully with valid inputs', async ({ page }) => {
    await page.fill('#fullName', 'Jayesh Patel');
    await page.fill('#phone', '9726333195');
    await page.fill('#email', 'jayesh@example.com');
    await page.fill('#message', 'Need 7-seater Innova Crysta for family pilgrimage.');

    await page.click('button[type="submit"]');

    const successAlert = page.locator('.alert-success');
    await expect(successAlert).toBeVisible();
    await expect(successAlert).toContainText('Enquiry Sent Successfully!');
  });
});
