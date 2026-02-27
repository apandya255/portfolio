import { NextRequest, NextResponse } from 'next/server';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const SYSTEM_PROMPT = `
You are the AI assistant for Akash Pandya's portfolio website.
Your job is to answer questions about Akash's background, experience, projects, and technical skills using the information visible on the site.

Guidelines:
- Keep responses concise, professional, and factual.
- If asked about unknown details, say you do not have that information and suggest contacting Akash directly.
- Do not invent achievements, numbers, employers, or technologies.
- Prefer practical recruiter-friendly summaries.
- Return plain text only (no markdown emphasis, no **bold** markers).
`.trim();

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const KNOWLEDGE_BASE = `
Name: Akash Pandya
Education:
- University of Maryland, College Park
- B.S. in Computer Science, Economics Minor
- Class of 2027
- GPA: 3.6
- Location: Chatham, New Jersey

Professional Experience:
1) Information Technology Intern, DTCC (Jersey City, NJ)
- June 2024-August 2024 and June 2025-Present
- Migrated legacy funds settlement web platforms into Real-Time Trade Matching workflows.
- Built and integrated 10+ UI components using Angular + Java backend services.
- Reduced QA bug reports by 15%.
- Increased automated Selenium test coverage to 30%.
- Improved deployment cycle speed by 20% through agile automation workflows.
- Automated KPI test-result reporting with SPL + Python, reducing manual work by 8+ hours/week.
- Improved Global Trade Repository alert analysis and cut reporting turnaround by 30%.

2) Spring Research Intern, OpenData (Remote, NJ)
- February 2024-June 2024
- Researched commercial/free data providers for AI-driven marketplace integration.
- Explored ML-based data quality scoring dimensions.
- Compared 10+ data marketplaces to guide roadmap decisions.

Projects:
1) Python Instruction Curriculum
- Delivered Python curriculum across 6 sessions.
- Taught 50+ students through Chatham library partnership.

2) Forensic Tester Application
- Led development of forensic analysis web app.
- App was later acquired by Data Unlimited International.
- Processed 100+ samples in internal comparison workflows.

3) Portfolio AI Chatbox
- Built floating chat UI and server-side chat API route in Next.js/TypeScript.
- Integrated OpenAI responses with portfolio-aware system prompt and robust fallback behavior.

Technical Skills:
- Languages: Python, Java, TypeScript, SQL, OCaml, Rust, R, C
- Frameworks: React, Angular
- Testing & Data: Selenium, Splunk (SPL)
- Tools/Workflow: Jira, Toad for Oracle, Agile Sprint Planning, Cross-Functional Collaboration

Links:
- GitHub: https://github.com/apandya255
- LinkedIn: https://www.linkedin.com/in/akash-pandya-6b15152a6/
- Resume: /resume.pdf
- Email: akashpandya1617@gmail.com
`.trim();

function localReplyFor(message: string): string {
  const q = message.toLowerCase();

  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return 'You can contact Akash at akashpandya1617@gmail.com. You can also connect via LinkedIn: https://www.linkedin.com/in/akash-pandya-6b15152a6/.';
  }
  if (q.includes('resume') || q.includes('cv')) {
    return 'Akash’s resume is available at /resume.pdf. You can open or download it directly from the Resume section.';
  }
  if (q.includes('education') || q.includes('university') || q.includes('gpa') || q.includes('major') || q.includes('minor')) {
    return 'Akash studies Computer Science (B.S.) with an Economics minor at the University of Maryland, College Park. He is in the Class of 2027 with a 3.6 GPA.';
  }
  if (q.includes('dtcc') || q.includes('intern') || q.includes('experience')) {
    return 'Akash interned at DTCC, where he migrated settlement/trade-matching workflows, built 10+ Angular/Java components, reduced QA bugs by 15%, improved Selenium coverage to 30%, and automated KPI/alert reporting workflows with SPL and Python.';
  }
  if (q.includes('project') || q.includes('portfolio') || q.includes('built')) {
    return 'Key projects include: (1) Python Instruction Curriculum (50+ students taught), (2) Forensic Tester Application (acquired by Data Unlimited International), and (3) Portfolio AI Chatbox (Next.js + TypeScript + OpenAI integration).';
  }
  if (q.includes('skill') || q.includes('tech stack') || q.includes('language') || q.includes('framework')) {
    return 'Akash’s skills include Python, Java, TypeScript, SQL, OCaml, Rust, R, C, plus React, Angular, Selenium, Splunk (SPL), Jira, and Toad for Oracle.';
  }
  if (q.includes('fintech') || q.includes('finance')) {
    return 'Akash is fintech-focused, with hands-on work in enterprise trade workflow modernization, settlement context systems, and operational automation in capital-markets infrastructure environments.';
  }
  if (q.includes('location') || q.includes('where')) {
    return 'Akash is based in Chatham, New Jersey.';
  }

  return "I can help with Akash's background, experience, projects, skills, education, resume, and contact details. Ask a specific question in one of those areas and I’ll answer directly.";
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OPENAI_API_KEY server environment variable.' },
      { status: 500 },
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const validMessages = incoming
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12);

  if (validMessages.length === 0) {
    return NextResponse.json({ error: 'No chat messages provided.' }, { status: 400 });
  }

  const input = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nPortfolio Data Bank:\n${KNOWLEDGE_BASE}` },
    ...validMessages.map((m) => ({ role: m.role, content: m.content })),
  ];
  const latestUserQuestion = [...validMessages].reverse().find((m) => m.role === 'user')?.content || '';

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        input,
        temperature: 0.4,
        max_output_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      const lower = errorText.toLowerCase();
      if (lower.includes('insufficient_quota') || lower.includes('quota')) {
        return NextResponse.json({ reply: localReplyFor(latestUserQuestion), source: 'local_fallback' });
      }
      return NextResponse.json({ error: `OpenAI API error: ${errorText}` }, { status: response.status });
    }

    const data = (await response.json()) as {
      output_text?: string;
      output?: Array<{
        content?: Array<{ type?: string; text?: string }>;
      }>;
    };

    const fromOutputText = data.output_text?.trim();
    const fromContentArray = data.output
      ?.flatMap((item) => item.content || [])
      .find((c) => c.type === 'output_text' && c.text?.trim())?.text;

    const reply = fromOutputText || fromContentArray || 'I could not generate a response.';
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: localReplyFor(latestUserQuestion), source: 'local_fallback' });
  }
}
