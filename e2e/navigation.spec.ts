import { test, expect } from '@playwright/test';

test.describe('Navigation & Routing E2E Suite', () => {
  test('should navigate to all static & dynamic routes without broken links', async ({ page }) => {
    const routes = [
      { path: '/', titleKeyword: 'Heshiv Mobility' },
      { path: '/about', titleKeyword: 'About Us' },
      { path: '/packages', titleKeyword: 'Packages' },
      { path: '/gallery', titleKeyword: 'Gallery' },
      { path: '/blog', titleKeyword: 'Blog' },
      { path: '/faq', titleKeyword: 'FAQ' },
      { path: '/contact', titleKeyword: 'Contact' },
      { path: '/enquiry', titleKeyword: 'Plan Your Trip' },
      { path: '/privacy-policy', titleKeyword: 'Privacy Policy' },
      { path: '/terms-and-conditions', titleKeyword: 'Terms' }
    ];

    for (const route of routes) {
      await page.goto(route.path);
      await expect(page).toHaveTitle(new RegExp(route.titleKeyword, 'i'));
    }
  });

  test('should render 404 page for unknown URLs', async ({ page }) => {
    await page.goto('/random-unknown-page-1234');
    await expect(page.locator('.err-code')).toContainText('404');
    await expect(page.locator('.err-title')).toContainText('Page Not Found');
  });
});
