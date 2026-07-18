import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const roles = [
  { title: "Associate Software Engineer", dates: "Aug 2025 — Apr 2026" },
  { title: "Software Engineer Intern", dates: "Feb 2025 — Aug 2025" },
];

const skillGroups = [
  {
    label: "Frontend",
    items:
      "Next.js 15 (App Router) · TypeScript · Tailwind CSS (incl. v4) · React · Responsive design · TipTap & TinyMCE · HTML-to-JSX converter · SVG filters & animation · Accessibility (WCAG)",
  },
  {
    label: "Backend & Auth",
    items:
      "Next.js API routes · HTTP-only cookie auth · Google OAuth · Flask (Python) with OCR · Spring Boot",
  },
  {
    label: "Data",
    items: "MongoDB · MySQL with SQLAlchemy · PostgreSQL · Firebase",
  },
  {
    label: "Cloud & Integrations",
    items: "AWS S3 · PayHere & Genie payments (sandbox → production)",
  },
  {
    label: "Deployment",
    items: "Vercel — incl. working around its lack of static IPs for payment gateways",
  },
  {
    label: "Ways of Working",
    items: "Git · Jira · Agile ceremonies",
  },
];

const clients = [
  { name: "MyMed.lk", url: "https://www.mymed.lk/" },
  { name: "EcoPlus", url: "https://www.ecoplusonline.lk/" },
  { name: "Avant Signature Builds", url: "https://www.avantsignaturebuilds.lk/" },
  { name: "Montclair Consulting", url: "https://www.montclairconsulting.ca/" },
  { name: "E9 Cargo", url: "https://www.e9cargo.lk/" },
  { name: "EXSOL", url: "https://exsol.lk/" },
  { name: "Ascension IT", url: "https://www.ascension.lk/" },
  { name: "Charts.lk", url: "https://charts.lk/" },
  { name: "Agromax", url: "https://agromax.lk/" },
  { name: "Skinovec", url: "https://skinovec.vercel.app/" },
];

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line px-[6vw] py-[110px]">
      <Reveal>
        <SectionTag num="03" label="The Record" />
        <h2 className="display mb-6 text-[clamp(40px,7vw,90px)] leading-[0.9]">Cloud-eDesign</h2>
        <p className="max-w-[640px] text-[15.5px] leading-[1.7] text-body">
          Production client work across frontend, backend &amp; auth, data, payments and
          deployment — my most recent role.
        </p>
      </Reveal>

      <div className="mt-10 divide-y divide-line border-y border-line">
        {roles.map((role, i) => (
          <Reveal
            key={role.title}
            delay={i * 100}
            className="group flex flex-wrap items-baseline justify-between gap-2 py-[26px]"
          >
            <span className="display text-[clamp(24px,4vw,40px)] text-paper transition-colors duration-300 group-hover:text-crimson">
              {role.title}
            </span>
            <span className="font-mono text-[13px] tracking-[0.05em] text-gold">{role.dates}</span>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.label} delay={i * 80}>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              {group.label}
            </div>
            <p className="mt-2 font-mono text-[12.5px] leading-[1.8] text-muted">{group.items}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Client sites — live
          </div>
        </Reveal>
        <div className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <Reveal key={client.name} delay={i * 40}>
              <a
                href={client.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-fit border-b border-line pb-1.5 font-mono text-[14px] text-paper transition-all duration-200 hover:translate-x-1 hover:border-crimson hover:text-crimson"
              >
                {client.name}&nbsp;↗
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
