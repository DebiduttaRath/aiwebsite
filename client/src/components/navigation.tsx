import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "focus",
        "industries",
        "tech",
        "contact",
        "video-odyssey",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    // { id: "industries", label: "Products" },
    { id: "industries", label: "Industries" },
    { id: "tech", label: "Technology" },
    { id: "about", label: "About Us" },
    // { id: "about", label: "Career" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="mr-3 h-12 w-12 relative">
                {/* Main Logo Ball with combined animations */}
                <div
                  className="absolute inset-0 z-10 rounded-full overflow-hidden 
                  shadow-[0_5px_15px_rgba(0,0,0,0.3),inset_0_10px_30px_rgba(255,255,255,0.9)] 
                  bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300
                  animate-pulse-glow animate-float"
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-full w-full object-cover mix-blend-multiply"
                  />
                </div>

                {/* Double Rings with different animations */}
                <div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-100/90 to-transparent 
              transform rotate-15 origin-center animate-orbit-ring"
                  style={{
                    width: "140%",
                    left: "-20%",
                    filter:
                      "blur(1px) drop-shadow(0 0 5px rgba(100,180,255,0.8))",
                  }}
                ></div>

                <div
                  className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-50/70 to-transparent 
              transform -rotate-10 origin-center animate-orbit-ring-2"
                  style={{
                    width: "160%",
                    left: "-30%",
                    filter:
                      "blur(0.8px) drop-shadow(0 0 3px rgba(100,180,255,0.5))",
                  }}
                ></div>
              </div>
              <div className="flex items-center">
                <div className="text-2xl font-bold gradient-text">
                  EarthMinds.ai
                </div>
                {/* Added GIF next to the brand name */}
                <div className="ml-4 h-12 w-12 relative">
                  <img
                    src="/indian_flag.gif" // Replace with your actual GIF path
                    alt="Animated icon"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors duration-200 font-medium ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-slate-200">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
