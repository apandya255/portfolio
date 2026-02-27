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
  { label: 'Graduation', value: 'Class of 2027' },
  { label: 'GPA', value: '3.6' },
  { label: 'Location', value: 'Chatham, NJ' },
  { label: 'Focus', value: 'Financial Technology' },
];

const experience = [
  {
    role: 'Information Technology Intern',
    org: 'Depository Trust and Clearing Corporation (DTCC)',
    orgHref: 'https://www.dtcc.com/',
    meta: 'Jersey City, New Jersey | June 2024 - August 2024, June 2025 - Present',
    bullets: [
      "Migrated legacy Funds Only Settlement Web platforms into DTCC's modern Real-Time Trade Matching Web application, supporting net/settlement workflows with over a trillion dollars in daily volume context.",
      'Developed and integrated 10+ UI components with Angular and backend services in Java, reducing QA bug reports by 15% and raising automated test coverage to 30% through Selenium.',
      'Collaborated in Agile sprints via Jira to write user stories, plan tasks, and accelerate deployment cycles by 20% through streamlined automation workflows.',
      'Automated KPI test-result aggregation using SPL and Python, reducing manual reporting by 8+ hours per week and improving performance monitoring cadence.',
      'Improved Global Trade Repository alert analysis with SPL, cutting reporting turnaround time by 30% with daily automated reports.',
    ],
  },
  {
    role: 'Spring Research Intern',
    org: 'OpenData',
    meta: 'Remote, New Jersey | February 2024 - June 2024',
    bullets: [
      'Evaluated free and commercial data sources for an AI-driven data marketplace platform to inform integration strategy.',
      'Explored machine learning approaches for automated data quality assessment using metadata coverage, freshness, and uniqueness signals.',
      'Analyzed 10+ data marketplaces across pricing models, product capabilities, and AI features to prioritize roadmap direction.',
    ],
  },
];

const projects = [
  {
    title: 'Python Instruction Curriculum',
    image: '/lotc_image.png',
    alt: 'Library of the Chathams logo',
    imageClass: 'h-20 w-auto',
    summary:
      'Built and delivered a Python curriculum across six sessions through a public library partnership, helping over 50 students progress into advanced CS coursework.',
    meta: 'Python, Curriculum Design, Instruction • Feb 2022 - Jun 2023',
    links: [{ label: 'Partner', href: 'https://chathamlibrary.org/' }],
  },
  {
    title: 'Forensic Tester Application',
    image: '/dataunlimitedinternational.jpeg',
    alt: 'Data Unlimited International logo',
    imageClass: 'h-32 w-full',
    summary:
      'Led development of a forensic analysis web application later acquired by Data Unlimited International, with 100+ samples processed via internal comparison workflows.',
    meta: 'Web Engineering, Data Processing • Jun 2021 - Aug 2021',
    links: [
      {
        label: 'Company',
        href: 'https://www.linkedin.com/company/data-unlimited-international/about/',
      },
    ],
  },
  {
    title: 'PandyaBot',
    image: '/pandyabot-logo.png',
    alt: 'Chatbox interface icon',
    imageClass: 'h-32 w-full',
    summary:
      "Designed and shipped PandyaBot for this portfolio with a floating chat UI, portfolio-aware prompting, and a secure server API route for OpenAI responses.",
    meta: 'Next.js, TypeScript, OpenAI API, UX Engineering • 2026',
    links: [{ label: 'GitHub', href: 'https://github.com/apandya255' }],
  },
];

const skillGroups = [
  { label: 'Languages', items: ['Python', 'Java', 'TypeScript', 'SQL', 'OCaml', 'Rust', 'R', 'C'] },
  { label: 'Frameworks', items: ['React', 'Angular'] },
  { label: 'Testing & Data', items: ['Selenium', 'Splunk (SPL)'] },
  { label: 'Tools & Workflow', items: ['Jira', 'Toad for Oracle', 'Agile Sprint Planning', 'Cross-Functional Collaboration'] },
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
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-slate-300 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
              Computer Science Student
            </p>
            <blockquote className="mt-2 border-l-4 border-slate-300 pl-6">
              <h1 className="font-[family-name:var(--font-playfair)] text-4xl leading-[1.2] text-slate-900 sm:text-5xl lg:text-6xl">
                &ldquo;Waste no more time arguing what a good man should be. Be one.&rdquo;
              </h1>
              <p className="mt-4 text-sm uppercase tracking-[0.15em] text-slate-500">Marcus Aurelius</p>
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={buttonClass}>
                Explore Projects
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={buttonClass}>
                Open Resume
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-2xl shadow-slate-200/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/70">
            <div className="mb-6 flex items-center gap-5 border-b border-slate-200 pb-6">
              <Image
                src="/profile_photo.jpeg"
                alt="Akash Pandya"
                width={120}
                height={120}
                priority
                sizes="120px"
                className="rounded-3xl object-cover ring-4 ring-slate-100"
              />
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-slate-900">Akash Pandya</h2>
                <p className="mt-1 text-sm text-slate-600">CS Major • Economics Minor</p>
                <p className="text-sm text-slate-600">University of Maryland, College Park</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {profileFacts.map((item) => (
                <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

          </aside>
        </section>

        <section id="about" className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60 sm:p-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">About Me</h2>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700">
            I&apos;m drawn to the intersection of software and markets, especially where reliability, speed, and transparency matter. My work spans
            frontend and backend development, test automation, and data workflows that reduce manual effort and improve operational confidence.
          </p>
        </section>

        <section id="experience" className="mt-20">
          <div className="mb-7 flex items-end justify-between">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">Experience</h2>
            <p className="hidden text-sm text-slate-500 md:block">Impact-driven internships in infrastructure and data products</p>
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
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
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
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4">
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

        <section id="resume" className="mt-20 rounded-3xl border border-slate-300 bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/40 sm:p-6">
          <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-4">
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-white">Resume</h2>
            <p className="mt-2 text-sm text-slate-300">Preview on desktop, or open/download directly.</p>

            <div className="mt-6 hidden h-[42rem] overflow-hidden rounded-xl border border-slate-700 bg-white md:block">
              <iframe src="/resume.pdf" title="Akash Pandya resume" width="100%" height="100%" className="border-0" />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={buttonClass}>
                Open in New Tab
              </a>
              <a href="/resume.pdf" download className={buttonClass}>
                Download PDF
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-20 rounded-3xl border border-slate-200 bg-white/90 p-8 text-center shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60 sm:p-10">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-slate-900">Let&apos;s Build</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-700">
            Open to fintech internships and software engineering opportunities where speed, reliability, and product quality matter.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:akashpandya1617@gmail.com" className={buttonClass}>
              Email
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
        <div className="mx-auto max-w-7xl text-center text-sm text-slate-200">© 2026 Akash Pandya.</div>
      </footer>

      <ChatWidget />
    </div>
  );
}
