import { NextRequest, NextResponse } from 'next/server';

type RiskProfile = 'conservative' | 'balanced' | 'aggressive';

type ShortlistAsset = {
  ticker: string;
  name: string;
  sector: string;
  style: string;
  score: number;
  thesis: string;
  catalyst: string;
  riskNote: string;
};

type AnalyzerRequest = {
  riskProfile?: RiskProfile;
  horizon?: string;
  focus?: string;
  notes?: string;
  shortlist?: ShortlistAsset[];
};

type AnalyzerResponse = {
  marketView: string;
  trends: string[];
  opportunities: Array<{ ticker: string; rationale: string }>;
  risks: string[];
  bottomLine: string;
};

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const SYSTEM_PROMPT = `
You are a financial market analysis assistant inside a portfolio project.
You are not a fiduciary, and you must not present anything as guaranteed returns or personalized financial advice.

Rules:
- Base the analysis only on the user inputs and shortlist provided.
- Do not imply access to live market prices, live news, or private data.
- Use clear, direct language.
- Emphasize trend quality, catalysts, risk, and portfolio-fit logic.
- Return strict JSON with keys: marketView, trends, opportunities, risks, bottomLine.
- trends must be an array of short strings.
- opportunities must be an array of objects with keys ticker and rationale.
- risks must be an array of short strings.
`.trim();

function buildFallbackAnalysis(body: AnalyzerRequest): AnalyzerResponse {
  const shortlist = (body.shortlist || []).slice(0, 3);
  const focus = body.focus || 'All sectors';
  const horizon = body.horizon || '6-12 months';
  const riskProfile = body.riskProfile || 'balanced';

  return {
    marketView: `This setup favors ${riskProfile} positioning over a ${horizon} horizon, with the strongest signals currently concentrated in ${focus.toLowerCase()}. The shortlist leans toward names with solid factor support rather than pure speculation.`,
    trends: [
      'Momentum remains most attractive when paired with durable earnings power.',
      'Quality balance sheets matter more as volatility rises.',
      'Catalyst-backed leaders screen better than crowded turnaround stories.',
    ],
    opportunities: shortlist.map((asset) => ({
      ticker: asset.ticker,
      rationale: `${asset.name} stands out because its factor score is ${asset.score}/100 and the thesis is anchored by ${asset.catalyst.toLowerCase()}.`,
    })),
    risks: shortlist.map((asset) => `${asset.ticker}: ${asset.riskNote}`),
    bottomLine:
      shortlist.length > 0
        ? `The strongest candidates in this run are ${shortlist.map((asset) => asset.ticker).join(', ')}. Use them as a research starting point, then verify valuation, earnings quality, and current market conditions before acting.`
        : 'No shortlist was provided, so this run should be treated as a template rather than a decision-ready investment screen.',
  };
}

function extractJson(text: string): AnalyzerResponse | null {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  try {
    return JSON.parse(text.slice(firstBrace, lastBrace + 1)) as AnalyzerResponse;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  let body: AnalyzerRequest;

  try {
    body = (await request.json()) as AnalyzerRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!Array.isArray(body.shortlist) || body.shortlist.length === 0) {
    return NextResponse.json({ error: 'A shortlist is required for analysis.' }, { status: 400 });
  }

  const fallback = buildFallbackAnalysis(body);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ analysis: fallback, source: 'local_fallback' });
  }

  const userPrompt = JSON.stringify(
    {
      riskProfile: body.riskProfile || 'balanced',
      horizon: body.horizon || '6-12 months',
      focus: body.focus || 'All sectors',
      notes: body.notes || '',
      shortlist: body.shortlist.slice(0, 6),
    },
    null,
    2,
  );

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        input: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
        max_output_tokens: 700,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ analysis: fallback, source: 'local_fallback' });
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    };

    const raw =
      data.output_text?.trim() ||
      data.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text?.trim() ||
      '';

    const parsed = raw ? extractJson(raw) : null;
    return NextResponse.json({ analysis: parsed || fallback, source: parsed ? 'openai' : 'local_fallback' });
  } catch {
    return NextResponse.json({ analysis: fallback, source: 'local_fallback' });
  }
}
