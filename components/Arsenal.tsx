import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const tags = [
  "Next.js 15",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "TanStack Query",
  "React Testing Library",
  "Spring Boot",
  "JUnit",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS S3",
  "Docker",
  "GitHub Actions & CI/CD",
  "Git",
  "Flask",
  "Python (basics)",
  "Kotlin",
  "Flutter & Dart",
  "Firebase",
  "PayHere & Genie",
  "Google OAuth",
  "Accessibility & WCAG",
  "SEO",
];

export default function Arsenal() {
  return (
    <section id="stack" className="border-t border-line px-[6vw] py-[70px] md:py-[110px]">
      <Reveal>
        <SectionTag num="04" label="The Arsenal" />
        <h2 className="display mb-4 text-[clamp(40px,7vw,90px)] leading-[0.9]">
          What I
          <br />
          build with
        </h2>
      </Reveal>
      <div className="mt-5 flex flex-wrap">
        {tags.map((tag, i) => (
          <Reveal
            key={tag}
            as="span"
            delay={i * 40}
            className="arsenal-tag display py-2.5 pr-[18px] text-[clamp(26px,4vw,46px)] tracking-[0.02em] text-paper sm:py-3.5 sm:pr-[30px]"
          >
            <span className="cursor-default transition-colors duration-200 hover:text-crimson">
              {tag}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
