# MarketBridge backend structure

The current runnable API remains `server.cjs` for compatibility. It only exposes health and market-quote endpoints. The folders under `src/` are the planned modular home for the next implementation phase; they are intentionally not wired to real authentication, identity checks, account balances, or orders.

## Intended responsibilities

- `src/config/` — environment validation and provider configuration.
- `src/routes/` — HTTP route registration and versioned API route groups.
- `src/controllers/` — request/response handling; keep business rules out of controllers.
- `src/services/` — application workflows such as onboarding and portfolio queries.
- `src/providers/` — adapters for approved identity, market-data, custody, and brokerage partners.
- `src/middleware/` — authentication, authorization, request IDs, rate limits, and error handling.
- `src/validators/` — request schemas and input validation.
- `src/repositories/` — persistence interfaces and database implementations.
- `src/domain/` — core account, investor, instrument, holding, and order types/rules.
- `tests/` — unit, integration, and API contract tests.

## Planned API groups

`/api/v1/auth`, `/api/v1/onboarding`, `/api/v1/investor`, `/api/v1/portfolio`, `/api/v1/instruments`, `/api/v1/orders`, `/api/v1/funding`, and `/api/v1/activity`.

Do not implement real KYC document handling, custody, deposits/withdrawals, or order execution as mock endpoints that appear production-ready. Those flows require approved providers, secure secrets, audit trails, regulatory review, and appropriate controls. Keep test identity data synthetic.
