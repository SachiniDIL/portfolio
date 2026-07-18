import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-[6vw] py-[70px] md:py-[110px]">
      <Reveal>
        <SectionTag num="06" label="Get In Touch" />
        <h2 className="display text-[clamp(38px,10vw,130px)] leading-[0.85]">
          Start a
          <br />
          <span className="serif-i block normal-case text-crimson">conversation.</span>
        </h2>
      </Reveal>
      <Reveal delay={150}>
        <div className="mt-9 flex flex-col gap-3">
          <a
            href="mailto:sdilrangi58@gmail.com"
            className="w-fit border-b border-line pb-1.5 font-mono text-base text-paper transition-all duration-200 hover:translate-x-1 hover:border-crimson hover:text-crimson"
          >
            sdilrangi58@gmail.com
          </a>
          <a
            href="https://github.com/SachiniDIL"
            target="_blank"
            rel="noreferrer"
            className="w-fit border-b border-line pb-1.5 font-mono text-base text-paper transition-all duration-200 hover:translate-x-1 hover:border-crimson hover:text-crimson"
          >
            github.com/SachiniDIL
          </a>
          <span className="w-fit pb-1.5 font-mono text-base text-muted/60">
            linkedin — coming soon
          </span>
        </div>
      </Reveal>
    </section>
  );
}
