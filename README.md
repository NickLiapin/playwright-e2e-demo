# Playwright E2E Demo - Swag Labs

[![E2E Tests](https://github.com/NickLiapin/playwright-e2e-demo/actions/workflows/ci.yml/badge.svg)](https://github.com/NickLiapin/playwright-e2e-demo/actions/workflows/ci.yml)
[![Playwright](https://img.shields.io/badge/tested%20with-Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

A compact, production-style **end-to-end test automation framework** built with
**Playwright + TypeScript**. It demonstrates how I structure real-world test
suites: Page Object Model, custom fixtures, data-driven tests, cross-browser
execution, CI on GitHub Actions, and Allure-ready reporting.

Tests run against the public demo site **[Swag Labs](https://www.saucedemo.com)**
- so there is no private data - and cover login, the shopping cart, and a full
checkout flow.

> **About this demo.** This is a deliberately compact, self-contained example
> against a public practice site. Its job is to show *how* I structure automation
> - the patterns, the tooling, the CI - not to mirror the scale of production work.
> The suites I build for real products are considerably larger and more complex,
> and that work stays under NDA, so it is not published here. Read this as a clean
> reference of craft and tooling command, not as a ceiling.

## What this demonstrates

- **Page Object Model** - every page is a small, focused class with intention-revealing
  methods; tests describe behaviour, not selectors. See [`pages/`](pages/).
- **Custom fixtures** - a `loggedIn` fixture handles authentication once and hands the
  test a ready inventory page, removing setup boilerplate. See [`fixtures/pages.ts`](fixtures/pages.ts).
- **Data-driven tests** - negative-login cases are parameterised from a single data file.
  See [`tests/login.spec.ts`](tests/login.spec.ts) and [`data/users.ts`](data/users.ts).
- **Cross-browser** - the same suite runs on Chromium, Firefox and WebKit.
- **CI/CD** - every push and pull request runs the full suite on GitHub Actions.
  See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).
- **Reporting** - Playwright HTML report + Allure results as CI artifacts.
- **Resilience** - automatic retries on CI, trace on first retry, screenshots and
  video retained on failure for fast debugging.

### Locator strategy

Swag Labs exposes stable `data-test` attributes, so the behavioural specs use those
(the most robust choice). Real apps rarely do - so
[`tests/locator-strategies.spec.ts`](tests/locator-strategies.spec.ts) separately
demonstrates targeting elements via **CSS, XPath, and role / text** locators, plus
**regex** assertions - the strategies production targets usually require.

## Project structure

```
playwright-e2e-demo/
|-- pages/                 # Page Objects (Login, Inventory, Cart, Checkout)
|-- fixtures/              # Custom Playwright fixtures (page objects + loggedIn)
|-- data/                  # Test data (users, negative-login cases)
|-- tests/                 # Specs: login, cart, checkout
|-- .github/workflows/     # GitHub Actions CI pipeline
`-- playwright.config.ts   # Browsers, reporters, retries, trace settings
```

## Running locally

```bash
npm install
npx playwright install     # download browser binaries
npm test                   # run the full suite (all browsers)
npm run report             # open the HTML report
```

Useful variants:

```bash
npm run test:headed                 # watch it run in a real browser
npm run test:ui                     # Playwright UI mode (time-travel debugging)
npx playwright test --project=chromium   # single browser
npx playwright test tests/checkout.spec.ts
```

### Allure report (optional)

The suite also emits Allure results. With the
[Allure command-line tool](https://allurereport.org/docs/install/) installed:

```bash
npm run allure:generate
npm run allure:open
```

## Continuous Integration

On every push / pull request to `main`, GitHub Actions installs dependencies and
browsers, runs the suite across Chromium, Firefox and WebKit, and uploads the
Playwright HTML report and Allure results as build artifacts. The badge at the top
reflects the latest run.

## Tech

Playwright, TypeScript, Allure, GitHub Actions

---

Built by **Nick Liapin** - Senior SDET / QA Automation Engineer. This repository is
a portfolio demo; the patterns here are the same ones I use to deliver
maintainable, CI-ready automation for client projects.
