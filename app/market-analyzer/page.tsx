'use client';

import Link from 'next/link';
import { startTransition, useMemo, useState } from 'react';

type RiskProfile = 'conservative' | 'balanced' | 'aggressive';
type Horizon = '1-3 months' | '6-12 months' | '1-3 years';

type Asset = {
  ticker: string;
  name: string;
  sector: string;
  style: string;
  trend: number;
  quality: number;
  valuation: number;
  volatility: number;
  resilience: number;
  catalyst: string;
  thesis: string;
  riskNote: string;
};

type RankedAsset = Asset & {
  score: number;
};

type AnalysisPayload = {
  marketView: string;
  trends: string[];
  opportunities: Array<{ ticker: string; rationale: string }>;
  risks: string[];
  bottomLine: string;
};

const marketUniverse: Asset[] = [
  {
    ticker: 'MSFT',
    name: 'Microsoft',
    sector: 'AI Platforms',
    style: 'Quality compounder',
    trend: 9,
    quality: 10,
    valuation: 6,
    volatility: 4,
    resilience: 9,
    catalyst: 'enterprise AI monetization and cloud durability',
    thesis: 'Large-cap platform with recurring revenue, AI upside, and strong execution quality.',
    riskNote: 'Premium multiple leaves less room for execution slips.',
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA',
    sector: 'Semiconductors',
    style: 'High-momentum leader',
    trend: 10,
    quality: 9,
    valuation: 4,
    volatility: 8,
    resilience: 7,
    catalyst: 'continued AI infrastructure demand',
    thesis: 'Category leader with exceptional trend strength and clear demand tailwinds.',
    riskNote: 'Crowded positioning and elevated expectations can amplify drawdowns.',
  },
  {
    ticker: 'AVGO',
    name: 'Broadcom',
    sector: 'Semiconductors',
    style: 'Cash-flow machine',
    trend: 8,
    quality: 9,
    valuation: 5,
    volatility: 6,
    resilience: 8,
    catalyst: 'AI networking demand and software cash flows',
    thesis: 'Strong blend of infrastructure exposure and durable free cash flow.',
    riskNote: 'Integration risk and valuation still matter after strong runs.',
  },
  {
    ticker: 'TSM',
    name: 'Taiwan Semiconductor',
    sector: 'Semiconductors',
    style: 'Picks-and-shovels leader',
    trend: 8,
    quality: 9,
    valuation: 7,
    volatility: 5,
    resilience: 8,
    catalyst: 'advanced-node demand and foundry leadership',
    thesis: 'High-quality manufacturing backbone for leading chip demand.',
    riskNote: 'Geopolitical concentration risk remains material.',
  },
  {
    ticker: 'V',
    name: 'Visa',
    sector: 'Payments',
    style: 'Defensive growth',
    trend: 7,
    quality: 9,
    valuation: 6,
    volatility: 3,
    resilience: 9,
    catalyst: 'global payments growth and operating leverage',
    thesis: 'High-margin network business with durable moats and lower volatility.',
    riskNote: 'Less explosive upside than higher-beta growth names.',
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase',
    sector: 'Financials',
    style: 'Quality value',
    trend: 7,
    quality: 8,
    valuation: 8,
    volatility: 5,
    resilience: 8,
    catalyst: 'balance-sheet strength and market-share gains',
    thesis: 'Best-in-class financial franchise with reasonable valuation support.',
    riskNote: 'Credit-cycle deterioration could pressure sentiment.',
  },
  {
    ticker: 'COST',
    name: 'Costco',
    sector: 'Consumer',
    style: 'Defensive compounder',
    trend: 7,
    quality: 9,
    valuation: 4,
    volatility: 3,
    resilience: 9,
    catalyst: 'membership economics and stable consumer demand',
    thesis: 'Operationally elite retailer with strong resilience in mixed environments.',
    riskNote: 'Rich valuation can cap near-term upside.',
  },
  {
    ticker: 'LLY',
    name: 'Eli Lilly',
    sector: 'Healthcare',
    style: 'Innovation leader',
    trend: 8,
    quality: 9,
    valuation: 3,
    volatility: 5,
    resilience: 8,
    catalyst: 'drug pipeline strength and obesity franchise momentum',
    thesis: 'Powerful product cycle and quality profile despite valuation sensitivity.',
    riskNote: 'Very high expectations raise execution risk.',
  },
  {
    ticker: 'BRK.B',
    name: 'Berkshire Hathaway',
    sector: 'Financials',
    style: 'Resilient allocator',
    trend: 6,
    quality: 9,
    valuation: 7,
    volatility: 3,
    resilience: 10,
    catalyst: 'capital flexibility and broad business diversification',
    thesis: 'Lower-volatility core holding with strong downside durability.',
    riskNote: 'May lag during sharp speculative rallies.',
  },
  {
    ticker: 'PLTR',
    name: 'Palantir',
    sector: 'Software',
    style: 'Speculative trend play',
    trend: 9,
    quality: 7,
    valuation: 2,
    volatility: 9,
    resilience: 5,
    catalyst: 'commercial AI adoption narrative',
    thesis: 'Strong narrative momentum and adoption story for aggressive growth setups.',
    riskNote: 'Valuation and sentiment can reverse quickly.',
  },
];

const focusOptions = ['All sectors', 'AI Platforms', 'Semiconductors', 'Payments', 'Financials', 'Healthcare', 'Consumer', 'Software'];

const defaultWatchlists: Record<string, string> = {
  'All sectors': 'MSFT, NVDA, AVGO, TSM, V, JPM',
  'AI Platforms': 'MSFT, NVDA, PLTR',
  Semiconductors: 'NVDA, AVGO, TSM',
  Payments: 'V, MSFT',
  Financials: 'JPM, BRK.B, V',
  Healthcare: 'LLY, MSFT',
  Consumer: 'COST, V',
  Software: 'MSFT, PLTR',
};

function sanitizeWatchlist(input: string) {
  return input
    .split(',')
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
}

function scoreAsset(asset: Asset, riskProfile: RiskProfile, horizon: Horizon) {
  const profileWeights = {
    conservative: { trend: 0.18, quality: 0.27, valuation: 0.18, volatility: -0.12, resilience: 0.29 },
    balanced: { trend: 0.26, quality: 0.24, valuation: 0.16, volatility: -0.1, resilience: 0.24 },
    aggressive: { trend: 0.36, quality: 0.18, valuation: 0.1, volatility: -0.06, resilience: 0.14 },
  } satisfies Record<RiskProfile, Record<string, number>>;

  const horizonBoost = {
    '1-3 months': { trend: 1.2, quality: 0.95, valuation: 0.95, resilience: 0.9 },
    '6-12 months': { trend: 1, quality: 1, valuation: 1, resilience: 1 },
    '1-3 years': { trend: 0.9, quality: 1.15, valuation: 1.05, resilience: 1.1 },
  } satisfies Record<Horizon, Record<string, number>>;

  const weights = profileWeights[riskProfile];
  const boost = horizonBoost[horizon];

  const raw =
    asset.trend * weights.trend * boost.trend +
    asset.quality * weights.quality * boost.quality +
    asset.valuation * weights.valuation * boost.valuation +
    asset.volatility * weights.volatility +
    asset.resilience * weights.resilience * boost.resilience;

  return Math.round((raw / 9) * 100);
}

function buildShortlist(watchlist: string[], focus: string, riskProfile: RiskProfile, horizon: Horizon): RankedAsset[] {
  const allowedTickers = new Set(watchlist);
  const scopedUniverse =
    focus === 'All sectors' ? marketUniverse : marketUniverse.filter((asset) => asset.sector === focus);

  const selectedUniverse = allowedTickers.size
    ? scopedUniverse.filter((asset) => allowedTickers.has(asset.ticker))
    : scopedUniverse;

  const effectiveUniverse = selectedUniverse.length > 0 ? selectedUniverse : scopedUniverse;

  return effectiveUniverse
    .map((asset) => ({
      ...asset,
      score: scoreAsset(asset, riskProfile, horizon),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export default function MarketAnalyzerPage() {
  const [focus, setFocus] = useState('All sectors');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('balanced');
  const [horizon, setHorizon] = useState<Horizon>('6-12 months');
  const [watchlist, setWatchlist] = useState(defaultWatchlists['All sectors']);
  const [notes, setNotes] = useState(
    'AI capex remains strong, rates are still a major variable, and I want names with durable execution rather than pure hype.',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisPayload | null>(null);
  const [source, setSource] = useState<'openai' | 'local_fallback' | null>(null);
  const [error, setError] = useState('');

  const shortlist = useMemo(
    () => buildShortlist(sanitizeWatchlist(watchlist), focus, riskProfile, horizon),
    [focus, horizon, riskProfile, watchlist],
  );

  const sectorSnapshot = useMemo(() => {
    const sectorScores = new Map<string, number[]>();
    shortlist.forEach((asset) => {
      const scores = sectorScores.get(asset.sector) || [];
      scores.push(asset.score);
      sectorScores.set(asset.sector, scores);
    });

    return [...sectorScores.entries()]
      .map(([sector, scores]) => ({
        sector,
        score: Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length),
      }))
      .sort((a, b) => b.score - a.score);
  }, [shortlist]);

  const runAnalysis = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/market-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focus,
          riskProfile,
          horizon,
          notes,
          shortlist: shortlist.map((asset) => ({
            ticker: asset.ticker,
            name: asset.name,
            sector: asset.sector,
            style: asset.style,
            score: asset.score,
            thesis: asset.thesis,
            catalyst: asset.catalyst,
            riskNote: asset.riskNote,
          })),
        }),
      });

      const data = (await response.json()) as {
        analysis?: AnalysisPayload;
        source?: 'openai' | 'local_fallback';
        error?: string;
      };

      if (!response.ok || !data.analysis) {
        throw new Error(data.error || 'Could not run analysis.');
      }

      startTransition(() => {
        setAnalysis(data.analysis || null);
        setSource(data.source || null);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error while running analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,transparent_32%),radial-gradient(circle_at_85%_15%,#d1fae5_0%,transparent_24%),linear-gradient(180deg,#f8fafc_0%,#edf4f7_100%)] px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Research workflow, not financial advice
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-tight text-slate-900 sm:text-5xl">
              Market Analyzer
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
              A vibed-out market research tool that scores investment candidates, highlights trend pockets, and turns your market notes into a sharper
              watchlist.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Back to Portfolio
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-200/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Setup</p>
                <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-slate-900">Tune the screen</h2>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Mode</p>
                <p className="text-sm font-semibold text-slate-900">Factor model + AI synthesis</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Focus</span>
                <select
                  value={focus}
                  onChange={(event) => {
                    const nextFocus = event.target.value;
                    setFocus(nextFocus);
                    setWatchlist(defaultWatchlists[nextFocus] || defaultWatchlists['All sectors']);
                  }}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {focusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Risk profile</span>
                <select
                  value={riskProfile}
                  onChange={(event) => setRiskProfile(event.target.value as RiskProfile)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <option value="conservative">Conservative</option>
                  <option value="balanced">Balanced</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Time horizon</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(['1-3 months', '6-12 months', '1-3 years'] as Horizon[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setHorizon(option)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        horizon === option ? 'bg-slate-900 text-white shadow-lg' : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Watchlist tickers</span>
                <input
                  value={watchlist}
                  onChange={(event) => setWatchlist(event.target.value)}
                  placeholder="MSFT, NVDA, JPM"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Market notes</span>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={5}
                  placeholder="Paste your macro or sector observations here..."
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-400"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={runAnalysis}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Running analysis...' : 'Run Analyzer'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFocus('All sectors');
                  setRiskProfile('balanced');
                  setHorizon('6-12 months');
                  setWatchlist(defaultWatchlists['All sectors']);
                  setNotes('AI capex remains strong, rates are still a major variable, and I want names with durable execution rather than pure hype.');
                  setAnalysis(null);
                  setSource(null);
                  setError('');
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Reset
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              This tool ranks a curated market universe using factor weights and then summarizes the setup with AI. It does not fetch live prices or
              guarantee investment outcomes.
            </p>
          </section>

          <section className="space-y-6">
            <article className="rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Shortlist</p>
                  <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-white">Best-looking setups</h2>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-300">Current lens</p>
                  <p className="text-sm font-semibold text-white">
                    {riskProfile} · {horizon}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {shortlist.map((asset, index) => (
                  <article key={asset.ticker} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.14em] text-slate-300">#{index + 1} pick</p>
                        <h3 className="mt-1 text-xl font-semibold text-white">
                          {asset.ticker} <span className="text-slate-300">· {asset.name}</span>
                        </h3>
                      </div>
                      <div className="rounded-2xl bg-emerald-400/15 px-3 py-2 text-right">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-emerald-200">Score</p>
                        <p className="text-lg font-semibold text-emerald-300">{asset.score}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-300">
                      {asset.sector} · {asset.style}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-100">{asset.thesis}</p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div className="rounded-2xl bg-white/5 px-3 py-2">Trend {asset.trend}/10</div>
                      <div className="rounded-2xl bg-white/5 px-3 py-2">Quality {asset.quality}/10</div>
                      <div className="rounded-2xl bg-white/5 px-3 py-2">Valuation {asset.valuation}/10</div>
                      <div className="rounded-2xl bg-white/5 px-3 py-2">Resilience {asset.resilience}/10</div>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
              <article className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/50">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Trend Board</p>
                <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-slate-900">Sector momentum</h2>
                <div className="mt-5 space-y-3">
                  {sectorSnapshot.map((item) => (
                    <div key={item.sector} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-slate-800">{item.sector}</span>
                        <span className="text-sm font-semibold text-slate-600">{item.score}/100</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500" style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/50">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">AI Readout</p>
                    <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-3xl text-slate-900">Narrative synthesis</h2>
                  </div>
                  {source ? (
                    <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                      {source === 'openai' ? 'AI enhanced' : 'Local fallback'}
                    </span>
                  ) : null}
                </div>

                {error ? <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

                {!analysis && !isLoading ? (
                  <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-sm leading-relaxed text-slate-600">
                    Run the analyzer to turn the factor-ranked shortlist into a cleaner market narrative, with key trends, risks, and the best-looking
                    names from this screen.
                  </div>
                ) : null}

                {isLoading ? (
                  <div className="mt-5 space-y-3">
                    <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                    <div className="h-20 w-full animate-pulse rounded-3xl bg-slate-100" />
                  </div>
                ) : null}

                {analysis ? (
                  <div className="mt-5 space-y-5 text-sm leading-relaxed text-slate-700">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Market View</h3>
                      <p className="mt-2">{analysis.marketView}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Trends</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {analysis.trends.map((trend) => (
                          <span key={trend} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                            {trend}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Opportunities</h3>
                      <div className="mt-3 space-y-3">
                        {analysis.opportunities.map((item) => (
                          <div key={item.ticker} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">{item.ticker}</p>
                            <p className="mt-1">{item.rationale}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Risks</h3>
                      <ul className="mt-3 space-y-2">
                        {analysis.risks.map((risk) => (
                          <li key={risk} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">Bottom Line</h3>
                      <p className="mt-2 text-slate-800">{analysis.bottomLine}</p>
                    </div>
                  </div>
                ) : null}
              </article>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
