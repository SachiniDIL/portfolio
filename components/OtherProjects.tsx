import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const projects = [
  {
    num: "01",
    name: "DevPing",
    sub: "url uptime monitor",
    desc: "Built to practice a full industrial dev workflow end-to-end: GitHub branch protection with PR templates, CI/CD via GitHub Actions, continuous deployment on Vercel, TanStack Query with polling and optimistic updates, ~95–100% component coverage with React Testing Library, and Docker multi-stage builds with docker-compose.",
    stack: "Next.js · TanStack Query · GitHub Actions · React Testing Library · Docker",
  },
  {
    num: "02",
    name: "TanStack Query Learning App",
    sub: "ssr & caching deep-dive",
    desc: "A from-scratch build covering the TanStack Query v5 mental model with the Next.js App Router: SSR patterns (prefetchQuery + dehydrate + HydrationBoundary), useQuery / useMutation / useQueries, dependent queries, and the two-cache system, backed by MongoDB Atlas.",
    stack: "Next.js App Router · TanStack Query v5 · MongoDB Atlas",
  },
];

export default function OtherProjects() {
  return (
    <section id="projects" className="border-t border-line px-[6vw] py-[110px]">
      <Reveal>
        <SectionTag num="04" label="Practice Files" />
        <h2 className="display mb-4 text-[clamp(40px,7vw,90px)] leading-[0.9]">
          Built to
          <br />
          learn
        </h2>
      </Reveal>
      <div className="mt-8">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={i * 100}
            className={`group grid grid-cols-1 gap-8 py-11 sm:grid-cols-[140px_1fr] ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <div className="display text-[44px] leading-none text-crimson-dim transition-colors duration-300 group-hover:text-crimson sm:text-[70px]">
              {project.num}
            </div>
            <div>
              <div className="display text-[clamp(30px,5vw,54px)] leading-[0.95] text-paper">
                {project.name}
                <span className="serif-i mt-1 block text-[0.55em] normal-case text-gold">
                  {project.sub}
                </span>
              </div>
              <p className="mt-3.5 max-w-[640px] text-[15.5px] leading-[1.7] text-body">
                {project.desc}
              </p>
              <p className="mt-3.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                {project.stack}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted/60">
          Repos — links coming soon
        </p>
      </Reveal>
    </section>
  );
}
