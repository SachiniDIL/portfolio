import Reveal from "./Reveal";
import SectionTag from "./SectionTag";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-[6vw] py-[110px]">
      <Reveal>
        <SectionTag num="01" label="The Brief" />
        <h2 className="display mb-10 text-[clamp(40px,7vw,90px)] leading-[0.9]">
          Why, not
          <br />
          just what
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <div className="max-w-[640px] space-y-5 text-[15.5px] leading-[1.7] text-body">
          <p>
            I&rsquo;m a final-year Software Engineering undergraduate at SLIIT, and most recently
            an Associate Software Engineer at Cloud-eDesign, where I built and shipped production
            web apps for eleven client businesses. I&rsquo;m now targeting roles at companies building
            AI-powered software.
          </p>
          <p>
            I care about understanding <span className="serif-i text-gold">why</span> a technical
            decision was made — not just shipping something that works. That means a real
            industrial workflow — CI/CD, branch protection, honest testing, honest tradeoffs —
            over tutorial-style projects.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
