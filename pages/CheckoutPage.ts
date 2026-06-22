import { type Page, type Locator, expect } from '@playwright/test';

/** Page Object for the two-step checkout flow. */
export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly summaryTotal: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectComplete(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}
