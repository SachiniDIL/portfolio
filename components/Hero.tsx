import HeroGlow from "./HeroGlow";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero-glow relative flex min-h-svh flex-col justify-center overflow-hidden px-[6vw] py-[8vh]">
      <div aria-hidden className="hero-vignette pointer-events-none absolute inset-0" />
      <HeroGlow />
      <Reveal className="z-[1]">
        <p className="eyebrow-dot flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-gold sm:text-[13px] sm:tracking-[0.25em]">
          open to software engineering roles · ai-powered products
        </p>
      </Reveal>
      <Reveal delay={120} className="z-[1] mt-6">
        <h1 className="display name-glow text-[clamp(64px,15vw,190px)] leading-[0.82] tracking-[0.01em] text-paper">
          Sachini
          <br />
          <span className="text-crimson">Dilrangi</span>
        </h1>
      </Reveal>
      <Reveal delay={260} className="z-[1]">
        <div className="mt-[22px] flex flex-wrap items-baseline gap-[18px]">
          <span className="serif-i text-[clamp(20px,3vw,30px)] text-paper">software engineer.</span>
          <span className="max-w-[460px] text-[15px] text-muted">
            Final-year Software Engineering undergraduate at SLIIT. Most recently Associate
            Software Engineer at Cloud-eDesign.
          </span>
        </div>
      </Reveal>
      <a
        href="#about"
        className="absolute bottom-9 left-[6vw] z-[1] font-mono text-[11.5px] tracking-[0.15em] text-muted transition-colors duration-200 hover:text-paper"
      >
        <span className="inline-block motion-safe:animate-bob">↓</span>
        &nbsp;&nbsp;SCROLL
      </a>
    </section>
  );
}
