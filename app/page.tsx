'use client';

import { useState } from 'react';
import Image from 'next/image';
import ChatWidget from './components/ChatWidget';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
];

const profileFacts = [
  { label: 'Degree', value: 'B.S. Computer Science' },
  { label: 'Minor', value: 'Economics' },
  { label: 'GPA', value: '3.5 / 4.0' },
];

const experience = [
  {
    role: 'Information Technology Intern',
    org: 'Depository Trust and Clearing Corporation (DTCC)',
    orgHref: 'https://www.dtcc.com/',
    meta: 'Jersey City, New Jersey | June – August 2024, 2025, 2026',
    sections: [
      {
        heading: 'Summer 2026',
        bullets: [
          'Remediated 11 SQL injection vulnerabilities across 10 production components and 3 core data services using PostgreSQL and DBeaver, executing 40+ live database tests and resolving 3 additional critical functional regressions.',
          'Built a production Trade Information Warehouse (TIW) retrieval pipeline, indexing hundreds of settlement documents for vector-based semantic search with typical chatbot responses under 1 minute.',
        ],
      },
      {
        heading: 'Summer 2025',
        bullets: [
          "Supported migration of legacy Funds Only Settlement web components into DTCC's Real-Time Trade Matching application, improving application reliability and maintainability.",
          'Shipped 8+ Angular UI components and Java/Spring Boot REST APIs while maintaining 90% unit test coverage and resolving Jenkins CI/CD build failures.',
        ],
      },
      {
        heading: 'Summer 2024',
        bullets: [
          'Automated KPI test-result aggregation using SPL, eliminating 2+ hours of manual reporting per week and enabling more frequent performance monitoring.',
          'Streamlined Global Trade Repository alert analysis using SPL, reducing alert response time by 30% and generating automated daily reports for the Alerts Team.',
        ],
      },
    ],
  },
];

const projects = [
  {
    title: 'Agentic AI Trading Platform',
    image: '/trading-icon.svg',
    alt: 'Trading platform icon',
    imageClass: 'h-24 w-24',
    summary:
      'Developed a 17-agent investment research system spanning fundamental, technical, macro, risk, and portfolio workflows to evaluate cross-market opportunities and generate trade recommendations.',
    meta: 'OpenClaw, Multi-Agent Systems, Python, Flask • May 2026 – Present',
    links: [{ label: 'GitHub', href: 'https://github.com/apandya255' }],
  },
  {
    title: 'Spotify User Data Pipeline',
    image: '/spotify-logo.png',
    alt: 'Spotify logo',
    imageClass: 'h-16 w-auto',
    summary:
      'Built an end-to-end data science pipeline across Spotify\'s top 100 artists, engineering trend-rate and listener-gap features and training a sequential neural network that achieved 93.7% test accuracy in identifying artists with high growth potential.',
    meta: 'Python, NumPy, Matplotlib, Scikit-learn, TensorFlow • Mar – May 2026',
    links: [{ label: 'GitHub', href: 'https://github.com/apandya255' }],
  },
  {
    title: 'AI in Higher Education',
    image: '/research-synthesis-icon.svg',
    alt: 'Research synthesis icon',
    imageClass: 'h-24 w-24',
    summary:
      'Contributed to a systematic research synthesis on generative AI in higher education, helping narrow 398 initial sources to 47 final studies and analyzing student learning outcomes across critical thinking, writing, and metacognition.',
    meta: 'Research Synthesis, Python, Google Forms, Mendeley • Jan – May 2026',
    links: [],
  },
  {
    title: 'PandyaBot',
    image: '/pandyabot-logo.png',
    alt: 'Chatbox interface icon',
    imageClass: 'h-32 w-full',
    summary:
      "Designed and shipped PandyaBot for this portfolio with a floating chat UI, portfolio-aware prompting, and a secure server API route for AI responses.",
    meta: 'Next.js, TypeScript, OpenAI API, UX Engineering • 2026',
    links: [{ label: 'GitHub', href: 'https://github.com/apandya255/portfolio' }],
  },
  {
    title: 'Python Instruction Curriculum',
    image: '/lotc_image.png',
    alt: 'Library of the Chathams logo',
    imageClass: 'h-20 w-auto',
    summary:
      'Built and delivered a Python curriculum across six sessions through a public library partnership, helping over 50 students progress into advanced CS coursework.',
    meta: 'Python, Curriculum Design, Instruction • Feb 2022 – Jun 2023',
    links: [{ label: 'Partner', href: 'https://chathamlibrary.org/' }],
  },
  {
    title: 'Forensic Tester Application',
    image: '/dataunlimitedinternational.jpeg',
    alt: 'Data Unlimited International logo',
    imageClass: 'h-32 w-full',
    summary:
      'Led development of a forensic analysis web application later acquired by Data Unlimited International, with 100+ samples processed via internal comparison workflows.',
    meta: 'Web Engineering, Data Processing • Jun 2021 – Aug 2021',
    links: [
      {
        label: 'Company',
        href: 'https://www.linkedin.com/company/data-unlimited-international/about/',
      },
    ],
  },
];

const skillGroups = [
  { label: 'Languages', items: ['Java', 'Python', 'C++', 'C', 'SQL', 'JavaScript', 'Bash', 'R', 'HTML', 'CSS'] },
  { label: 'Frameworks & Libraries', items: ['Spring Boot', 'Angular', 'TensorFlow', 'Scikit-learn', 'Pandas', 'PostgreSQL', 'NumPy', 'Matplotlib'] },
  { label: 'Developer Tools', items: ['Git', 'GitHub', 'Jenkins', 'Maven', 'DBeaver', 'SonarQube', 'Jira', 'IntelliJ IDEA', 'VS Code', 'Kiro', 'Amazon Bedrock'] },
];

const buttonClass =
  'inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700 focus-visible:ring-offset-2';

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_0%,#e5eef9_0%,transparent_30%),radial-gradient(circle_at_85%_20%,#e8edf4_0%,transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-700/70 bg-gradient-to-r from-slate-900 to-slate-700 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8" aria-label="Main navigation">
          <a href="#top" className="animate-gradient bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text font-[family-name:var(--font-playfair)] text-2xl font-semibold text-transparent">
            Akash Pandya
          </a>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md border border-slate-400/80 px-3 py-1.5 text-sm text-white md:hidden"
          >
            Menu
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="group relative py-1 text-sm font-medium text-slate-200 transition hover:text-white">
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </nav>

        <div
          id="mobile-nav"
          className={`${mobileOpen ? 'max-h-80 py-3' : 'max-h-0'} overflow-hidden border-t border-slate-600 bg-slate-800 transition-all duration-300 md:hidden`}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-8 sm:pt-36">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/75 px-6 py-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur sm:px-10 sm:py-14">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_top,#dbeafe_0%,transparent_58%)] lg:block" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-14">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Open to full-time software engineering roles starting summer 2027
              </span>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                Skilled Software Developer & Computer Enthusiast
              </p>

              <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Akash Pandya
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 lg:text-lg">
                Three-time DTCC intern building production software for capital markets infrastructure, with experience across security remediation, AI retrieval pipelines, frontend delivery, and data-driven automation.
              </p>

              <p className="mt-5 text-sm font-medium tracking-[0.08em] text-slate-500 uppercase">
                University of Maryland &rsquo;27 • B.S. Computer Science • Economics Minor
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a href="#projects" className={buttonClass}>
                  View Projects
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  Open Resume
                </a>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {profileFacts.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-5 shadow-sm">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-slate-800 sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-300/30">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#bfdbfe_0%,transparent_68%)] blur-2xl" />
                    <Image
                      src="/profile_photo.jpeg"
                      alt="Akash Pandya"
                      width={240}
                      height={240}
                      priority
                      sizes="(max-width: 1024px) 220px, 240px"
                      className="relative mx-auto rounded-full object-cover ring-4 ring-white shadow-2xl"
                    />
                  </div>

                  <div className="mt-6 w-full rounded-2xl bg-slate-50 px-5 py-4 text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Current Focus</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Building reliable software for high-stakes systems, with a strong interest in fintech platforms, workflow automation, and polished user experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60 sm:p-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">About Me</h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700">
            I&apos;m a CS major with an Economics minor who genuinely cares about how financial systems work — not just how to code around them. I&apos;m drawn to the challenge of introducing emerging technology into an industry where the cost of failure is real. Whether it&apos;s designing cleaner data pipelines, building more testable UIs, or thinking through how AI fits responsibly into capital markets, I want to be the engineer who bridges both worlds.
          </p>
        </section>

        <section id="experience" className="mt-20">
          <div className="mb-7 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">Experience</h2>
          </div>

          <div className="space-y-6">
            {experience.map((item) => (
              <article key={item.role} className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60">
                <h3 className="text-2xl font-semibold text-slate-900">{item.role}</h3>
                <p className="mt-1 text-sm font-medium text-slate-700">
                  {item.orgHref ? (
                    <a href={item.orgHref} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-400 underline-offset-4">
                      {item.org}
                    </a>
                  ) : (
                    item.org
                  )}
                </p>
                <p className="mt-1 text-sm text-slate-500">{item.meta}</p>
                {item.sections.map((section) => (
                  <div key={section.heading} className="mt-4">
                    <p className="text-sm font-semibold text-slate-800">{section.heading}</p>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-20">
          <div className="mb-7 flex items-end justify-between gap-3">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">Projects</h2>
            <a
              href="https://github.com/apandya255"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-semibold text-slate-600 underline decoration-slate-400 underline-offset-4 md:inline"
            >
              View GitHub Profile
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project.title} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/60">
                <div className="mb-4 flex h-40 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={220}
                    height={140}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-contain ${project.imageClass ?? 'h-20 w-auto'}`}
                  />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-slate-700">{project.summary}</p>
                <p className="mt-3 text-xs text-slate-500">{project.meta}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60 sm:p-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">Technical Skills</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">{group.label}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="resume" className="mt-20">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900 mb-2">Resume</h2>
          <p className="text-sm text-slate-500 mb-6">Preview below, or open and download directly.</p>

          <div className="mt-4 hidden h-[42rem] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg md:block">
            <iframe src="/resume.pdf" title="Akash Pandya resume" width="100%" height="100%" className="border-0" />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Open in New Tab
            </a>
            <a href="/resume.pdf" download className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-slate-700 px-8 py-3.5 text-sm font-bold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              Download PDF
            </a>
          </div>
        </section>

        <section id="contact" className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60 sm:p-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">Let&apos;s Build</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-700">
            Open to software engineering roles where speed, reliability, and product quality matter.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:akashpandya1617@gmail.com" target="_blank" rel="noopener noreferrer" className={buttonClass}>
              Personal Email
            </a>
            <a href="mailto:apandya7@terpmail.umd.edu" target="_blank" rel="noopener noreferrer" className={buttonClass}>
              Student Email
            </a>
            <a href="https://www.linkedin.com/in/akash-pandya-6b15152a6/" target="_blank" rel="noopener noreferrer" className={buttonClass}>
              LinkedIn
            </a>
            <a href="https://github.com/apandya255" target="_blank" rel="noopener noreferrer" className={buttonClass}>
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-700/70 bg-gradient-to-r from-slate-900 to-slate-700 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-300">© {new Date().getFullYear()} Akash Pandya. All rights reserved.</div>
      </footer>

      <ChatWidget />
    </div>
  );
}
