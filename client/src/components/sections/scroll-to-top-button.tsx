import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

      setScrollPercentage(scrollPercent);
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercentage / 100) * circumference;

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div
        className={`
        relative
        transition-all
        duration-300
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
      >
        {/* Progress Circle - Properly centered around the button */}
        <div className="absolute -inset-4 pointer-events-none z-20">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 108 108"
          >
            <circle
              cx="54"
              cy="54"
              r={radius}
              stroke="#3b82f6"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-150"
            />
          </svg>
        </div>

        {/* Button - Maintains the exact UI from first code */}
        <Button
          onClick={scrollToTop}
          className="
            rounded-full 
            h-16 w-16 p-0
            shadow-2xl
            hover:shadow-3xl
            bg-white
            hover:bg-white
            border-2 border-blue-100
            transition-all
            duration-300
            hover:scale-110
            group
            flex flex-col items-center justify-center
            relative
            z-30
          "
          aria-label="Scroll to top"
        >
          {/* Content - Exactly like first code */}
          <div className="flex flex-col items-center justify-center">
            {/* Up Arrow Icon */}
            <ChevronUp className="w-8 h-8 text-blue-600 transition-transform group-hover:-translate-y-0.5" />

            {/* Percentage Display - Below the icon like first code */}
            <div
              className="
              text-blue-600 
              text-sm 
              font-bold 
              transition-all
              duration-200
              group-hover:scale-110
              mt-1
            "
            >
              {Math.round(scrollPercentage)}%
            </div>
          </div>
        </Button>

        {/* Glow effect */}
        <div
          className="
          absolute 
          inset-0 
          rounded-full 
          bg-blue-400/20 
          blur-lg 
          -z-10 
          group-hover:bg-blue-400/30 
          transition-all 
          duration-300
        "
        ></div>

        {/* Tooltip - Optional, can be removed if not needed */}
        <div
          className="
          absolute 
          -top-10 
          left-1/2 
          transform 
          -translate-x-1/2 
          bg-slate-900/95
          text-white 
          text-xs 
          px-3 
          py-2 
          rounded-lg 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-200 
          pointer-events-none
          shadow-lg
          whitespace-nowrap
          backdrop-blur-sm
          z-40
        "
        >
          Scroll to Top
          <div
            className="
            absolute 
            -bottom-1 
            left-1/2 
            transform 
            -translate-x-1/2 
            w-2 
            h-2 
            bg-slate-900 
            rotate-45
          "
          ></div>
        </div>
      </div>
    </div>
  );
}
