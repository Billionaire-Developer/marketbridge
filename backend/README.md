# MarketBridge API (market-data phase)

This API safely proxies public market quotes to the frontend. It does **not** place orders, hold funds, authenticate users, or connect to brokerage accounts.

## Run locally

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and optionally add a Finnhub API key.
4. `npm run dev`

The API listens on `http://localhost:4000`.

- `GET /api/health` — health check
- `GET /api/market` — quotes and provider status

Binance public spot prices for BTC, ETH and SOL work without a key. US stock quotes use Finnhub and require `FINNHUB_API_KEY`. Without it, those rows remain demo values. Provider outages also fall back to demo values. The frontend polls every 15 seconds; this is not a streaming WebSocket feed.

Keep provider tokens in the backend `.env`; never put them in a `VITE_` variable or commit `.env`. Respect provider terms, quotas, and market-data licensing. Quotes can be delayed and are not guaranteed real-time.
