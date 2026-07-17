import Hero from "@/components/Hero";
import About from "@/components/About";
import Featured from "@/components/Featured";
import Experience from "@/components/Experience";
import OtherProjects from "@/components/OtherProjects";
import Arsenal from "@/components/Arsenal";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Featured />
      <Experience />
      <OtherProjects />
      <Arsenal />
      <Contact />
      <footer className="border-t border-line px-[6vw] py-10 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">
        © 2026 Sachini Dilrangi — Software Engineer
      </footer>
    </main>
  );
}
