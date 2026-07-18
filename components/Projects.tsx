"use client";

import { useState } from "react";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const stats = [
  {
    label: "True-positive rate",
    desc: "Ensemble plagiarism-detection engine — TF-IDF, Jaccard similarity and N-gram Dice coefficient — at an 8% false-positive rate, with real-time WebSocket risk alerts.",
    count: { to: 91, suffix: "%" },
  },
  {
    label: "Feedback latency",
    desc: "Average response time for LLM-powered, real-time essay feedback.",
    count: { to: 5, prefix: "<", suffix: "s" },
  },
  {
    label: "Contradictions",
    desc: "Feedback contradictions cut by a purpose-built consistency-enforcement engine.",
    count: { from: 23, to: 6, prefix: "23→", suffix: "%" },
  },
  {
    label: "Grading time",
    desc: "Instructor grading time reduced through AI-assisted grading.",
    count: { to: 35, prefix: "−", suffix: "%" },
  },
];

const practiceBuilds = [
  {
    name: "DevPing",
    sub: "url uptime monitor",
    desc: "Built to practice a full industrial dev workflow end-to-end: GitHub branch protection with PR templates, CI/CD via GitHub Actions, continuous deployment on Vercel, TanStack Query with polling and optimistic updates, ~95–100% component coverage with React Testing Library, and Docker multi-stage builds with docker-compose.",
    stack: "Next.js · TanStack Query · GitHub Actions · React Testing Library · Docker",
  },
  {
    name: "TanStack Query Learning App",
    sub: "ssr & caching deep-dive",
    desc: "A from-scratch build covering the TanStack Query v5 mental model with the Next.js App Router: SSR patterns (prefetchQuery + dehydrate + HydrationBoundary), useQuery / useMutation / useQueries, dependent queries, and the two-cache system, backed by MongoDB Atlas.",
    stack: "Next.js App Router · TanStack Query v5 · MongoDB Atlas",
  },
];

export default function Projects() {
  const [showPractice, setShowPractice] = useState(false);

  return (
    <section id="work" className="border-t border-line px-[6vw] py-[70px] md:py-[110px]">
      <Reveal>
        <SectionTag num="03" label="The Work" />
        <h2 className="display mb-4 text-[clamp(40px,7vw,90px)] leading-[0.9]">
          Case
          <br />
          files
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr] sm:gap-8">
        <Reveal>
          <div className="display text-[44px] leading-none text-crimson-dim sm:text-[70px]">01</div>
        </Reveal>
        <div>
          <Reveal>
            <h3 className="display text-[clamp(40px,7vw,84px)] leading-[0.9]">SmartLMS</h3>
            <p className="serif-i mt-2 text-[clamp(18px,2.5vw,28px)] text-gold">
              versioned submissions &amp; ai feedback
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              Final-year research project — SLIIT · Aug 2025 — Present
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 max-w-[680px] space-y-5 text-[15.5px] leading-[1.7] text-body">
              <p>
                A microservices-based Learning Management System built to improve programming
                education through version-controlled submissions, AI-powered plagiarism detection,
                and real-time feedback.
              </p>
              <p>
                I&rsquo;m the sole developer of the AI-enhanced submission, feedback and
                version-control module within a three-person capstone team — my teammates built
                the project-management and analytics modules.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group bg-bg transition-colors duration-300 hover:bg-bg2"
              >
                <Reveal delay={i * 120} className="p-5 sm:p-7">
                  <div className="display text-[clamp(44px,5vw,64px)] leading-none text-paper transition-all duration-300 group-hover:[text-shadow:0_0_40px_rgba(200,16,46,0.5)]">
                    <CountUp {...stat.count} />
                  </div>
                  <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">{stat.desc}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <Reveal delay={100}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.06em] text-muted">
              Spring Boot · PostgreSQL · Redis · Next.js · TypeScript · LLM/NLP integration
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
              Screenshots · Repo · Live demo — coming soon
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 border-y border-line">
        <button
          type="button"
          aria-expanded={showPractice}
          onClick={() => setShowPractice((v) => !v)}
          className="flex w-full items-center justify-between py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-crimson"
        >
          <span>{showPractice ? "Hide practice builds" : "View practice builds (2)"}</span>
          <span className="text-[16px] leading-none text-crimson">{showPractice ? "−" : "+"}</span>
        </button>

        {showPractice && (
          <div className="border-t border-line pb-10">
            <p className="serif-i mt-8 text-[clamp(16px,2vw,22px)] text-gold">
              built to learn, not flagship work.
            </p>
            {practiceBuilds.map((project, i) => (
              <Reveal
                key={project.name}
                delay={i * 100}
                className={`py-8 ${i > 0 ? "border-t border-line" : ""}`}
              >
                <div className="display text-[clamp(26px,4vw,44px)] leading-[0.95] text-paper">
                  {project.name}
                  <span className="serif-i mt-1 block text-[0.6em] normal-case text-gold">
                    {project.sub}
                  </span>
                </div>
                <p className="mt-3.5 max-w-[640px] text-[15.5px] leading-[1.7] text-body">
                  {project.desc}
                </p>
                <p className="mt-3.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                  {project.stack}
                </p>
              </Reveal>
            ))}
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
              Repos — links coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
