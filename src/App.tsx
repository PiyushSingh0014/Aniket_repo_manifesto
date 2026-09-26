import { About } from "./components/sections/About";
import { CodingLeague } from "./components/sections/CodingLeague";
import { Contact } from "./components/sections/Contact";
import { EventApp } from "./components/sections/EventApp";
import { Experience } from "./components/sections/Experience";
import { Footer } from "./components/sections/Footer";
import { Hero } from "./components/sections/Hero";
import { Manifesto } from "./components/sections/Manifesto";
import { Mentorship } from "./components/sections/Mentorship";
import { Nav } from "./components/sections/Nav";
import { NewCoders } from "./components/sections/NewCoders";
import { Plan } from "./components/sections/Plan";
import { Vision } from "./components/sections/Vision";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Experience />
        <Vision />
        <Manifesto />
        <EventApp />
        <CodingLeague />
        <NewCoders />
        <Mentorship />
        <Plan />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
