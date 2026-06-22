import { test } from '../fixtures/pages';

test.describe('Shopping cart', () => {
  test('adds a single product to the cart', async ({ loggedIn }) => {
    await loggedIn.addItemToCart('Sauce Labs Backpack');
    await loggedIn.expectCartCount(1);
  });

  test('adds multiple products to the cart', async ({ loggedIn }) => {
    await loggedIn.addItemToCart('Sauce Labs Backpack');
    await loggedIn.addItemToCart('Sauce Labs Bike Light');
    await loggedIn.expectCartCount(2);
  });

  test('shows the added product on the cart page', async ({ loggedIn, cartPage }) => {
    await loggedIn.addItemToCart('Sauce Labs Backpack');
    await loggedIn.openCart();
    await cartPage.expectItem('Sauce Labs Backpack');
  });
});
