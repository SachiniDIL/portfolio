export default function Hero() {
  return (
    <section className="hero-glow relative flex min-h-screen flex-col justify-center px-[6vw] py-[8vh]">
      <div aria-hidden className="hero-vignette pointer-events-none absolute inset-0" />
      <p className="eyebrow-dot z-[1] mb-6 flex items-center gap-2.5 font-mono text-[13px] tracking-[0.25em] text-gold">
        open to software engineering roles · ai-powered products
      </p>
      <h1 className="display name-glow z-[1] text-[clamp(64px,15vw,190px)] leading-[0.82] tracking-[0.01em] text-paper">
        Sachini
        <br />
        <span className="text-crimson">Dilrangi</span>
      </h1>
      <div className="z-[1] mt-[22px] flex flex-wrap items-baseline gap-[18px]">
        <span className="serif-i text-[clamp(20px,3vw,30px)] text-paper">software engineer.</span>
        <span className="max-w-[460px] text-[15px] text-muted">
          Final-year Software Engineering undergraduate at SLIIT. Most recently Associate Software
          Engineer at Cloud-eDesign.
        </span>
      </div>
      <div className="absolute bottom-9 left-[6vw] z-[1] font-mono text-[11.5px] tracking-[0.15em] text-muted">
        <span className="inline-block motion-safe:animate-bob">↓</span>
        &nbsp;&nbsp;SCROLL
      </div>
    </section>
  );
}
