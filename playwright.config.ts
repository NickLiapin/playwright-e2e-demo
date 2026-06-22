import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel workers on CI for stable, ordered output */
  workers: process.env.CI ? 1 : undefined,
  /* Reporters: console list + Playwright HTML + Allure results */
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    /* Collect a trace when retrying a failed test */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
