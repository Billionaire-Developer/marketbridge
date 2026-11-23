# MarketBridge brokerage interface prototype

A responsive brokerage-style prototype inspired by approachable investing apps. It starts with a public company website, then guides visitors through sign-up/sign-in and a demo identity-onboarding flow before showing the investor workspace.

## Project layout

- `frontend/` — Vite + React UI, public landing page, demo auth/onboarding, and investor dashboard.
- `backend/server.cjs` — currently runnable Express API for health and market quote proxy.
- `backend/src/` — organized future backend modules; see `backend/ARCHITECTURE.md`.
- `backend/.env.example`, `frontend/.env.example` — environment templates.

## Run locally

Terminal 1:
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
npm run dev
```

## Prototype boundaries

The public site, account forms, identity onboarding, dashboard balances, portfolio holdings, and transaction views are demonstration UI/data. The sign-up/sign-in forms do not create or authenticate real accounts; onboarding does not transmit or verify identity information. Use synthetic test details only. Do not enter real ID numbers.

No real brokerage account, custody, deposits, withdrawals, or trade execution is connected. The backend currently serves market quotes only; see its README and `ARCHITECTURE.md` for planned module responsibilities. Production identity checks and financial activity require suitable licensed/approved providers, security controls, regulatory review, and data licensing. Company notes are informational, not investment advice.
