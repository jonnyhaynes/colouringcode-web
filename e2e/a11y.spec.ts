import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has zero WCAG 2 A/AA axe violations', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('home page keeps the live contact details', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: '+44 (0) 7460 843016' })).toHaveAttribute(
    'href',
    'tel:+447460843016'
  );
  await expect(page.getByRole('link', { name: 'team@colouringcode.com' })).toHaveAttribute(
    'href',
    'mailto:team@colouringcode.com'
  );
});
