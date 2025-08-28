import { useState, useEffect, useRef } from "react";
import { mlApps, categories, MLApp } from "@/data/mlApps";
import MLAppsModal from "./ml-apps-modal";
import { Play, Clock } from "lucide-react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

export default function MLAppsGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedApp, setSelectedApp] = useState<MLApp | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [remainingTime, setRemainingTime] = useState(1200);
  const [hasExpired, setHasExpired] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredApps =
    selectedCategory === "All"
      ? mlApps
      : mlApps.filter((app) => app.category.includes(selectedCategory));

  // Timer logic
  useEffect(() => {
    const storedTime = localStorage.getItem("mlAppsRemaining");
    const expiredFlag = localStorage.getItem("mlAppsExpired");

    if (expiredFlag === "true") {
      setHasExpired(true);
    }
    if (storedTime !== null) {
      const timeLeft = parseInt(storedTime, 10);
      setRemainingTime(timeLeft > 0 ? timeLeft : 0);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen && !hasExpired) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          const nextTime = prev - 1;
          localStorage.setItem("mlAppsRemaining", nextTime.toString());

          if (nextTime <= 0) {
            clearInterval(timerRef.current!);
            setHasExpired(true);
            localStorage.setItem("mlAppsExpired", "true");
            return 0;
          }
          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [isModalOpen, hasExpired]);

  const handleAppClick = (app: MLApp) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
  };

  const resetTimer = () => {
    setRemainingTime(300);
    setHasExpired(false);
    localStorage.removeItem("mlAppsRemaining");
    localStorage.removeItem("mlAppsExpired");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
          <RocketLaunchIcon className="h-10 w-10 text-slate-900" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Explore Earthminds AI Universe
        </h2>
        <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          Interactive machine learning tools powered by EarthMinds.ai. Each
          application offers a unique AI experience.
        </p>

        {/* Timer Status */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Session Time: {remainingTime}s remaining</span>
          </div>
          {hasExpired && (
            <button
              onClick={resetTimer}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Reset Timer
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105
              flex items-center gap-2
              ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app)}
            className={`
              group cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 
              hover:shadow-2xl hover:scale-105 transition-all duration-300 transform
              relative overflow-hidden
              hover:border-${app.color}-300
            `}
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-${app.color}-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`
                text-4xl mb-4 p-3 rounded-xl inline-flex
                bg-${app.color}-100 group-hover:bg-${app.color}-200
                transition-colors duration-300
                group-hover:scale-110 transition-transform
              `}
              >
                {app.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-colors">
                <span className="gradient-text">Earthminds</span> {app.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {app.description}
              </p>

              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`
                  inline-block px-3 py-1 rounded-full text-xs font-medium
                  bg-${app.color}-100 text-${app.color}-800
                  group-hover:bg-${app.color}-200 group-hover:text-${app.color}-900
                  transition-colors duration-300
                `}
                >
                  {app.category.join(" / ")}
                </span>

                {/* Play Button */}
                <div
                  className={`
                  p-2 rounded-full bg-white shadow-md
                  group-hover:bg-${app.color}-100 group-hover:text-${app.color}-600
                  transition-colors duration-300
                `}
                >
                  <Play className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-2xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No applications found
          </h3>
          <p className="text-gray-500">Try selecting a different category.</p>
        </div>
      )}

      {/* Modal */}
      <MLAppsModal
        app={selectedApp}
        isOpen={isModalOpen}
        onClose={closeModal}
        remainingTime={remainingTime}
        hasExpired={hasExpired}
      />
    </div>
  );
}
