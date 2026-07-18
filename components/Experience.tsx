import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const roles = [
  {
    title: "Associate Software Engineer",
    meta: "Cloud-eDesign · Aug 2025 — Apr 2026",
    did: "Owned production client work end-to-end for eleven live client businesses — Next.js frontends, API routes with HTTP-only cookie auth and Google OAuth, PayHere & Genie payment integrations, AWS S3, and Vercel deployments.",
  },
  {
    title: "Software Engineer Intern",
    meta: "Cloud-eDesign · Feb 2025 — Aug 2025",
    did: "Built and shipped features on the same production client codebases in Agile sprints with Git and Jira; promoted to Associate Software Engineer after six months.",
  },
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
  { name: "ENERG1", url: "https://www.energ1.lk/" },
];

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line px-[6vw] py-[70px] md:py-[110px]">
      <Reveal>
        <SectionTag num="02" label="The Record" />
      </Reveal>

      <div className="divide-y divide-line border-y border-line">
        {roles.map((role, i) => (
          <Reveal key={role.title} delay={i * 100} className="group py-9">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="display text-[clamp(32px,5vw,64px)] leading-[0.95] text-paper transition-colors duration-300 group-hover:text-crimson">
                {role.title}
              </h3>
              <span className="font-mono text-[13px] tracking-[0.05em] text-gold">
                {role.meta}
              </span>
            </div>
            <p className="mt-4 max-w-[680px] text-[15.5px] leading-[1.7] text-body">{role.did}</p>
          </Reveal>
        ))}
      </div>

      <div className="mt-14">
        <Reveal>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Skills &amp; technologies used
          </div>
        </Reveal>
        <div className="mt-6 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 80}>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {group.label}
              </div>
              <p className="mt-2 font-mono text-[12.5px] leading-[1.8] text-muted">{group.items}</p>
            </Reveal>
          ))}
        </div>
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
