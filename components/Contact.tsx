import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";
import { site } from "@/lib/site";

const directLinkClasses =
  "w-fit border-b border-line pb-1.5 font-mono text-base transition-all duration-200 hover:translate-x-1 hover:border-crimson hover:text-crimson";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-[6vw] py-[70px] md:py-[110px]">
      <Reveal>
        <SectionTag num="05" label="Get In Touch" />
        <h2 className="display text-[clamp(38px,10vw,130px)] leading-[0.85]">
          Start a
          <br />
          <span className="serif-i block normal-case text-crimson">conversation.</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-14 lg:grid-cols-2">
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
        <Reveal delay={250}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            Or reach me directly
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <a href={`mailto:${site.email}`} className={`${directLinkClasses} text-paper`}>
              {site.email}
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className={`${directLinkClasses} text-paper`}
            >
              {site.githubLabel}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`${directLinkClasses} text-paper`}
            >
              {site.linkedinLabel}
            </a>
            <a href={site.cvPath} download className={`${directLinkClasses} text-gold`}>
              download cv (pdf) ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
