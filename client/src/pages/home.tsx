import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import FocusAreas from "@/components/sections/focus-areas";
import Industries from "@/components/sections/industries";
import TechStack from "@/components/sections/tech-stack";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import EMAssistant from "@/components/sections/em-assistant";
import Videos from "@/components/sections/video-section/videos";
import EMLens from "@/components/sections/em-lens";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <Hero />
      <EMLens />
      <EMAssistant />
      <About />
      <Services />
      <Videos />
      <FocusAreas />
      <Industries />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}
