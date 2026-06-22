import { type Page, type Locator, expect } from '@playwright/test';

/** Page Object for the shopping cart page. */
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  private cartItem(itemName: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: itemName });
  }

  async expectItem(itemName: string): Promise<void> {
    await expect(this.cartItem(itemName)).toBeVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
