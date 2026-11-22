# MarketBridge — frontend + market-data API

A responsive broker-style dashboard prototype with dedicated Overview, Markets, Portfolio, Wallet, and Transactions screens, searchable asset lists, category filters, watchlists, holdings, demo wallet actions, transaction history, and trade-ticket previews. The project includes an optional backend proxy for market quotes.

## Run it

Terminal 1:
```bash
cd backend
npm install
cp .env.example .env
# Optional: add FINNHUB_API_KEY to backend/.env for US stock quotes
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
npm run dev
```

The frontend polls `http://localhost:4000/api/market` every 15 seconds. Binance public market data supplies BTC/ETH/SOL quotes without a key. Finnhub supplies US stock quotes when `FINNHUB_API_KEY` is configured. Otherwise, unavailable quotes remain demo values and the UI reports demo fallback. Set `VITE_API_BASE_URL` in `frontend/.env` if the API is hosted elsewhere.

## Important limits

This is still a prototype. Only crypto and selected US-stock quote data are connected; Forex, commodities, portfolio values, chart history, balances, activity, and order previews are illustrative. No real orders, deposits, withdrawals, brokerage login, or financial advice are implemented. Market data may be delayed and is subject to provider terms and rate limits. Do not deploy without production security, validation, monitoring, and provider-compliant data licensing.
