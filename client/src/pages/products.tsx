import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import MLAppsGallery from "@/components/sections/ml-apps-section/ml-apps-gallery";
import EMAssistant from "@/components/sections/em-assistant";
import ScrollToTopButton from "@/components/sections/scroll-to-top-button";

export default function Products() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <EMAssistant />
      <ScrollToTopButton />
      <MLAppsGallery />
      <Footer />
    </div>
  );
}
