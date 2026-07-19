import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

const tags = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "TanStack Query",
  "Spring Boot",
  "Java",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "CI/CD",
  "Git",
  "AWS S3",
  "Flutter",
  "Firebase",
  "OAuth",
  "Testing",
  "SEO",
  "Accessibility",
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
