# Repaw Web Regression Fixture

A deliberately small, deterministic storefront for validating Repaw's web-testing workflow.
It follows the minimal-reproduction idea: one product, one journey, and defects with obvious expected signals.

## Hosted variants

After GitHub Pages is enabled, use these as URL builds in a Repaw **Web** project:

| Variant | URL suffix | Expected result |
| --- | --- | --- |
| Good | `?variant=good` | Cart count, quantity, €12.00 total, and confirmation work. |
| Broken | `?variant=broken` | The item is stored, but the visible and accessible cart count stays at `0`. |
| JavaScript error | `?variant=jserror` | Opening the cart throws an uncaught `TypeError`. |

The repository's GitHub Pages URL is shown in the repository **Deployments** section.

## Recommended Repaw run

Create one Web project and register each hosted variant as a separate URL build. Use the same objective for each:

> Add one Paw Balm to the cart. Verify the cart count becomes 1. Open the cart, verify the quantity is 1 and the total is €12.00, then complete the test order and confirm success.

Expected comparison:

- **Good:** passes the journey.
- **Broken:** produces a functional/UI finding because the cart count remains zero.
- **JavaScript error:** produces an automatic browser-error finding when the cart is opened.

Run both Repaw browser profiles to cover desktop (1366×768) and mobile touch (390×844).

## Run locally

Requires Node.js 18 or newer and has no dependencies:

```bash
npm start
```

Then open:

- <http://127.0.0.1:4173/?variant=good>
- <http://127.0.0.1:4173/?variant=broken>
- <http://127.0.0.1:4173/?variant=jserror>

## Why this fixture instead of Electron

Repaw's Playwright web driver is implemented and tested today. Its native Windows and macOS desktop drivers are still planned work, so an Electron app would test an unsupported path. This fixture exercises currently available functionality without adding build tooling, package installation, authentication, network calls, or nondeterministic data.

## License

MIT
