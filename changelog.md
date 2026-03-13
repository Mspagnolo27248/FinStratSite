# Changelog

## 2026-03-13

### Upgraded yahoo-finance2 v2 → v3
- Bumped `yahoo-finance2` from `2.13.2` to `3.13.2` in `package.json`
- Rewrote API client to use the new class-based instantiation (`new YahooFinance()`) in `pages/api/YahooApi/_yahooClient.js`
- Updated `pages/api/YahooApi/index.js` and `pages/api/YahooApi/StockHistory.js` to import from the shared client

### Fixed fetch requests not sending data to API
- All POST `fetch()` calls in `pages/Markets/index.js`, `Search.js`, `History.js`, and `Backtest.js` were missing the `Content-Type: application/json` header
- Without it, Next.js did not parse `req.body`, so `symbol` and other fields came through as `undefined`, causing Yahoo Finance calls to fail and `.map()` to crash on the response
- Added `headers: { 'Content-Type': 'application/json' }` to all four pages

### Deleted dead code
- Removed `Utilities/yahoo-api-access.js` — unused file with broken v1-style callback API and a bad `module.exports` reference
- Removed `test-yahoo.mjs` — temporary debug script, no production value
