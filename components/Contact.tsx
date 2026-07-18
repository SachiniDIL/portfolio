import ContactForm from "./ContactForm";
import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

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
            <a
              href="https://www.linkedin.com/in/sachini-dilrangi-434128242"
              target="_blank"
              rel="noreferrer"
              className="w-fit border-b border-line pb-1.5 font-mono text-base text-paper transition-all duration-200 hover:translate-x-1 hover:border-crimson hover:text-crimson"
            >
              linkedin.com/in/sachini-dilrangi
            </a>
            <a
              href="/Sachini-Dilrangi-CV.pdf"
              download
              className="w-fit border-b border-line pb-1.5 font-mono text-base text-gold transition-all duration-200 hover:translate-x-1 hover:border-crimson hover:text-crimson"
            >
              download cv (pdf) ↓
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
