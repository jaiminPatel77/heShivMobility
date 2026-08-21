import { test, expect } from '@playwright/test';

test.describe('SEO & Meta Tags E2E Suite', () => {
  test('Home Page should contain complete SEO meta tags & Organization JSON-LD', async ({ page }) => {
    await page.goto('/');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Heshiv Mobility/);

    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Heshiv Mobility/);

    const canonicalLink = page.locator('link[rel="canonical"]');
    await expect(canonicalLink).toHaveAttribute('href', /.*/);

    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
    const jsonContent = await jsonLdScript.textContent();
    expect(jsonContent).toContain('TravelAgency');
    expect(jsonContent).toContain('Heshiv Mobility');
  });

  test('Package Detail Page should contain dynamic package metadata', async ({ page }) => {
    await page.goto('/packages/somnath-dwarka-spiritual-tour');

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Somnath/);
  });
});
