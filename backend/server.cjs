require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = Number(process.env.PORT || 4000);
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'marketbridge-api' }));
const demo = [
 ['AAPL','Apple Inc.','Stocks',228.87,1.84,'A','violet'],['NVDA','NVIDIA Corporation','Stocks',142.62,3.21,'N','lime'],['TSLA','Tesla, Inc.','Stocks',338.74,-.92,'T','red'],['MSFT','Microsoft Corporation','Stocks',425.22,.76,'M','blue'],['BTC','Bitcoin','Crypto',98432.18,2.76,'₿','orange'],['ETH','Ethereum','Crypto',3642.51,1.13,'◆','blue'],['SOL','Solana','Crypto',218.42,-1.26,'S','purple'],['EUR/USD','Euro / US Dollar','Forex',1.0842,-.18,'€','sky'],['GBP/USD','British Pound / US Dollar','Forex',1.2718,.34,'£','green'],['GOLD','Gold Spot','Commodities',2738.4,.67,'Au','gold']
];
async function getJson(url) { const r = await fetch(url, { signal: AbortSignal.timeout(5000) }); if (!r.ok) throw new Error(`Provider returned ${r.status}`); return r.json(); }
app.get('/api/market', async (_req, res) => {
  const out = demo.map(a => [...a]); let liveCount = 0;
  // Binance public spot ticker endpoint: no API key is required for public market data.
  try {
    const ticks = await getJson('https://api.binance.com/api/v3/ticker/24hr');
    const map = new Map(ticks.map(t => [t.symbol, t]));
    for (const [symbol, pair] of [['BTC','BTCUSDT'],['ETH','ETHUSDT'],['SOL','SOLUSDT']]) {
      const t = map.get(pair); const i = out.findIndex(a => a[0] === symbol);
      if (t && i >= 0) { out[i][3] = Number(t.lastPrice); out[i][4] = Number(t.priceChangePercent); liveCount++; }
    }
  } catch (e) { console.warn('Binance market fetch failed:', e.message); }
  // Finnhub quote endpoint needs a token. Without one, stock values remain clearly demo fallback.
  if (FINNHUB_API_KEY) {
    for (const [symbol, ticker] of [['AAPL','AAPL'],['NVDA','NVDA'],['TSLA','TSLA'],['MSFT','MSFT']]) {
      try {
        const q = await getJson(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${encodeURIComponent(FINNHUB_API_KEY)}`);
        const i = out.findIndex(a => a[0] === symbol);
        if (i >= 0 && Number(q.c) > 0) { out[i][3] = Number(q.c); out[i][4] = q.dp == null ? out[i][4] : Number(q.dp); liveCount++; }
      } catch (e) { console.warn(`Finnhub quote failed for ${ticker}:`, e.message); }
    }
  }
  res.json({ mode: liveCount ? 'live' : 'demo', assets: out, liveAssets: liveCount, updatedAt: new Date().toISOString(), providers: { crypto: 'Binance public market data', stocks: FINNHUB_API_KEY ? 'Finnhub' : 'Demo fallback' } });
});
app.listen(PORT, () => console.log(`MarketBridge API listening on http://localhost:${PORT}`));
