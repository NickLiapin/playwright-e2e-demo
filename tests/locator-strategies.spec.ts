import { test, expect } from '../fixtures/pages';

/**
 * Locator-strategy showcase - a deliberate capability demonstration, not a
 * behavioural test.
 *
 * Swag Labs exposes stable `data-test` attributes, so the real specs in this
 * repo use those (the most robust option). Production apps rarely give you that
 * luxury, so this file shows fluency across the strategies you actually need on
 * real targets: CSS, XPath, role- and text-based locators, plus regex assertions.
 */
test.describe('Locator strategies (capability showcase)', () => {
  test('locates the same element via CSS, XPath and text', async ({ loggedIn }) => {
    const page = loggedIn.page;

    // 1) CSS selector
    await expect(page.locator('css=.title')).toHaveText('Products');

    // 2) XPath (Playwright auto-detects the leading //)
    await expect(page.locator('//span[text()="Products"]')).toHaveText('Products');

    // 3) Text-based locator
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  test('uses regex assertions for URL and price format', async ({ loggedIn }) => {
    const page = loggedIn.page;

    // Regex match on the URL
    await expect(page).toHaveURL(/inventory\.html$/);

    // Scope to one product card, then assert its price matches a currency regex
    const price = page
      .locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .locator('.inventory_item_price');
    await expect(price).toHaveText(/^\$\d+\.\d{2}$/);
  });
});
