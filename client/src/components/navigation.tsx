import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, Link } from "wouter";

// Define proper TypeScript interfaces
interface NavItemBase {
  id: string;
  label: string;
}

interface RouteNavItem extends NavItemBase {
  type: "route";
  path: string;
}

interface SectionNavItem extends NavItemBase {
  type: "section";
}

type NavItem = RouteNavItem | SectionNavItem;

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Only handle scroll-based active section if we're on the home page
    if (location === "/") {
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
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first with hash
    if (location !== "/") {
      setLocation(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  const navigateToPage = (path: string) => {
    setLocation(path);
    setIsOpen(false);
  };

  // Properly typed navItems array
  const navItems: NavItem[] = [
    { id: "home", label: "Home", type: "route", path: "/" },
    {
      id: "products",
      label: "Products",
      type: "route",
      path: "/products",
    },
    { id: "industries", label: "Industries", type: "section" },
    { id: "tech", label: "Technology", type: "section" },
    { id: "about", label: "About Us", type: "route", path: "/about" },
  ];

  // Determine active item based on current location
  const getActiveItem = (item: NavItem) => {
    if (item.type === "route" && location === item.path) {
      return true;
    }
    if (
      item.type === "section" &&
      location === "/" &&
      activeSection === item.id
    ) {
      return true;
    }
    return false;
  };

  // Type guard to check if item is a RouteNavItem
  const isRouteItem = (item: NavItem): item is RouteNavItem => {
    return item.type === "route";
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo with Link to Home */}
              <Link href="/">
                <div className="flex items-center cursor-pointer">
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
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                if (isRouteItem(item)) {
                  return (
                    <Link key={item.id} href={item.path}>
                      <button
                        onClick={() => navigateToPage(item.path)}
                        className={`transition-colors duration-200 font-medium ${
                          getActiveItem(item)
                            ? "text-blue-600"
                            : "text-slate-700 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    </Link>
                  );
                } else {
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`transition-colors duration-200 font-medium ${
                        getActiveItem(item)
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                }
              })}
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
              {navItems.map((item) => {
                if (isRouteItem(item)) {
                  return (
                    <Link key={item.id} href={item.path}>
                      <button
                        onClick={() => navigateToPage(item.path)}
                        className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                          getActiveItem(item)
                            ? "text-blue-600"
                            : "text-slate-700 hover:text-blue-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    </Link>
                  );
                } else {
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200 ${
                        getActiveItem(item)
                          ? "text-blue-600"
                          : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                }
              })}
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
