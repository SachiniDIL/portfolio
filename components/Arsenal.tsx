import SectionTag from "./SectionTag";

const tags = [
  "Next.js 15",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "TanStack Query",
  "Spring Boot",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS S3",
  "Docker",
  "GitHub Actions & CI/CD",
  "Git",
  "Flask",
  "Python (basics)",
  "PayHere & Genie",
  "Google OAuth",
  "Accessibility & WCAG",
  "SEO",
];

export default function Arsenal() {
  return (
    <section id="stack" className="border-t border-line px-[6vw] py-[110px]">
      <SectionTag num="05" label="The Arsenal" />
      <h2 className="display mb-4 text-[clamp(40px,7vw,90px)] leading-[0.9]">
        What I
        <br />
        build with
      </h2>
      <div className="mt-5 flex flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="arsenal-tag display py-3.5 pr-[30px] text-[clamp(26px,4vw,46px)] tracking-[0.02em] text-paper"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
