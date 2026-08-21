import { test, expect } from '@playwright/test';

test.describe('Responsive Design Viewport Suite', () => {
  const viewports = [
    { width: 320, height: 568, name: 'Mobile S (320px)' },
    { width: 375, height: 667, name: 'Mobile M (375px)' },
    { width: 768, height: 1024, name: 'Tablet (768px)' },
    { width: 1024, height: 768, name: 'Laptop (1024px)' },
    { width: 1440, height: 900, name: 'Desktop (1440px)' }
  ];

  for (const vp of viewports) {
    test(`should render Home without horizontal overflow at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');

      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScrollbar).toBe(false);

      if (vp.width < 1024) {
        await expect(page.locator('.hamburger-btn')).toBeVisible();
      } else {
        await expect(page.locator('.desktop-nav')).toBeVisible();
      }
    });
  }
});
