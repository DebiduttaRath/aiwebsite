import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import About from "@/components/sections/about";
import ScrollToTopButton from "@/components/sections/scroll-to-top-button";
import EMAssistant from "@/components/sections/em-assistant";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <EMAssistant />
      <ScrollToTopButton />
      <About isHome={false} />
      <Footer />
    </div>
  );
}
