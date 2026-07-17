import SectionTag from "./SectionTag";

const stats = [
  {
    value: "91%",
    label: "True-positive rate",
    desc: "Ensemble plagiarism-detection engine — TF-IDF, Jaccard similarity and N-gram Dice coefficient — at an 8% false-positive rate, with real-time WebSocket risk alerts.",
  },
  {
    value: "<5s",
    label: "Feedback latency",
    desc: "Average response time for LLM-powered, real-time essay feedback.",
  },
  {
    value: "23→6%",
    label: "Contradictions",
    desc: "Feedback contradictions cut by a purpose-built consistency-enforcement engine.",
  },
  {
    value: "−35%",
    label: "Grading time",
    desc: "Instructor grading time reduced through AI-assisted grading.",
  },
];

export default function Featured() {
  return (
    <section id="work" className="border-t border-line px-[6vw] py-[110px]">
      <SectionTag num="02" label="Featured Case File" />
      <h2 className="display text-[clamp(48px,9vw,110px)] leading-[0.9]">SmartLMS</h2>
      <p className="serif-i mt-2 text-[clamp(18px,2.5vw,28px)] text-gold">
        versioned submissions &amp; ai feedback
      </p>
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
        Final-year research project — SLIIT · Aug 2025 — Present
      </p>
      <div className="mt-8 max-w-[680px] space-y-5 text-[15.5px] leading-[1.7] text-body">
        <p>
          A microservices-based Learning Management System built to improve programming education
          through version-controlled submissions, AI-powered plagiarism detection, and real-time
          feedback.
        </p>
        <p>
          I&rsquo;m the sole developer of the AI-enhanced submission, feedback and version-control
          module within a three-person capstone team — my teammates built the project-management
          and analytics modules.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-bg p-7">
            <div className="display text-[clamp(44px,5vw,64px)] leading-none text-paper">
              {stat.value}
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              {stat.label}
            </div>
            <p className="mt-3 text-[13.5px] leading-[1.6] text-muted">{stat.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 font-mono text-xs uppercase tracking-[0.06em] text-muted">
        Spring Boot · PostgreSQL · Redis · Next.js · TypeScript · LLM/NLP integration
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
        Screenshots · Repo · Live demo — coming soon
      </p>
    </section>
  );
}
