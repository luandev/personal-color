import { test, expect } from '@playwright/test';

// Visual regression test for the landing page

test('landing page screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});
