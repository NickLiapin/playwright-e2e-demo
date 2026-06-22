import { test } from '../fixtures/pages';
import { users, invalidLogins } from '../data/users';

test.describe('Authentication', () => {
  test('standard user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('locked-out user is rejected with an error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError('Sorry, this user has been locked out');
  });

  // Data-driven negative cases.
  for (const data of invalidLogins) {
    const label = `${data.username || '(empty)'} / ${data.password || '(empty)'}`;
    test(`invalid login is rejected: ${label}`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(data.username, data.password);
      await loginPage.expectError(data.error);
    });
  }
});
