import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation, Link } from "wouter";

// Socials unchanged
const socials = [
  {
    name: "X",
    url: "https://x.com/EarthMindsAI",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 1227"
        className="w-5 h-5 fill-current"
      >
        <path d="M714 514L1160 0H1020L672 404 356 0H0l468 579L0 1227h140l374-434 336 434h356L714 514z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/earth-minds-ai/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-5 h-5 fill-current"
      >
        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.07 108.1 0 83 0 53.4a53.79 53.79 0 01107.58 0c0 29.6-24.07 54.7-53.79 54.7zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.2-58.4-23.5 0-37.6 15.8-43.8 31.1-2.2 5.3-2.8 12.6-2.8 20v153H173V148.9h88.7v40.8h1.3c12.4-19.7 34.6-47.8 84.6-47.8 61.8 0 108.3 40.4 108.3 127.2V448z" />
      </svg>
    ),
  },
];

// Types to mirror Navigation behavior
interface LinkBase {
  id: string;
  label: string;
}
interface RouteLink extends LinkBase {
  type: "route";
  path: string;
}
interface SectionLink extends LinkBase {
  type: "section";
}
type FooterLink = RouteLink | SectionLink;

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [location, setLocation] = useLocation();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) =>
      apiRequest("POST", "/api/newsletter", { email }),
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      setNewsletterEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api", "newsletter"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      newsletterMutation.mutate(newsletterEmail);
    }
  };

  const scrollToSection = (sectionId: string) => {
    // If not on home, go to home with hash (matches Navigation.tsx behavior)
    if (location !== "/") {
      setLocation(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navigateToPage = (path: string) => setLocation(path);

  // Updated Quick Links:
  // - Home → route "/"
  // - About → route "/about"
  // - Services → Products (route "/products")
  const quickLinks: FooterLink[] = [
    { id: "home", label: "Home", type: "route", path: "/" },
    { id: "about", label: "About Us", type: "route", path: "/about" },
    { id: "products", label: "Products", type: "route", path: "/products" },
    // If you want section links later, add like:
    // { id: "tech", label: "Technology", type: "section" },
  ];

  const isRoute = (l: FooterLink): l is RouteLink => l.type === "route";

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">
                EarthMinds.ai
              </div>
              <p className="text-slate-400">
                Turning complex ideas into intelligent, scalable solutions.
              </p>
              <div className="flex space-x-4 mt-4">
                {socials.map(({ name, url, svg }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  >
                    {svg}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) =>
                isRoute(item) ? (
                  <li key={item.id}>
                    <Link href={item.path}>
                      <button
                        onClick={() => navigateToPage(item.path)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {item.label}
                      </button>
                    </Link>
                  </li>
                ) : (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">
              Stay updated with the latest AI insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} EarthMinds.ai. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
