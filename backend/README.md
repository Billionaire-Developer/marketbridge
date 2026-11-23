# MarketBridge API

The currently runnable Express API exposes:
- `GET /api/health`
- `GET /api/market`

It does not authenticate users, verify identity, hold funds, or execute trades. Planned backend modules and boundaries are documented in `ARCHITECTURE.md`; modular implementation is a later phase.

## Local setup
```bash
npm install
cp .env.example .env
npm run dev
```

The server listens on `http://localhost:4000`. Set `FINNHUB_API_KEY` only in `backend/.env` to enable the optional stock-quote provider. Never commit `.env` or expose provider secrets in frontend variables. Market-data availability, latency, quotas, and licensing depend on the provider.

## Production boundary
Real account creation, identity verification, custody, funding, and order execution are not implemented. They require approved providers, secure identity-document handling, auditability, risk controls, and regulatory review. Use synthetic details only in this prototype.
