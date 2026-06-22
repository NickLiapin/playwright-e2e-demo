import { type Page, type Locator, expect } from '@playwright/test';

/** Page Object for the product inventory (post-login landing) page. */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  /** "Add to cart" button scoped to a single product card by its name. */
  private itemAddButton(itemName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: itemName })
      .getByRole('button', { name: 'Add to cart' });
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.itemAddButton(itemName).click();
  }

  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
