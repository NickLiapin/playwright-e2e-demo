import { test, expect } from '../fixtures/pages';

test.describe('Checkout', () => {
  test('completes an end-to-end purchase', async ({ loggedIn, cartPage, checkoutPage }) => {
    await loggedIn.addItemToCart('Sauce Labs Backpack');
    await loggedIn.addItemToCart('Sauce Labs Bike Light');
    await loggedIn.expectCartCount(2);

    await loggedIn.openCart();
    await cartPage.expectItem('Sauce Labs Backpack');
    await cartPage.checkout();

    await checkoutPage.fillInformation('Nick', 'Liapin', '12345');
    await expect(checkoutPage.summaryTotal).toBeVisible();
    await checkoutPage.finish();
    await checkoutPage.expectComplete();
  });
});
