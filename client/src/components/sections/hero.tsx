import bgVideo from "../../assets/hero_bg_video.mp4";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const buttonData = [
    {
      text: "Build With Us",
      onClick: "contact",
      className: "em_hero_btn_1 text-white",
      // className: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
    },
    {
      text: "See Our Work",
      onClick: "video-odyssey",
      className: "em_hero_btn_2 border-white bg-white",
      // className: "border-white hover:bg-white hover:text-slate-900 text-white",
    },
    {
      text: "Talk to an Expert",
      onClick: "contact",
      className: "em_hero_btn_3 text-white",
      // className:
      // "border-cyan-400 hover:bg-cyan-400 hover:text-slate-900 text-cyan-400",
    },
  ];

  const tileData = [
    {
      icon: "🚀",
      title: "Rapid MVP Delivery",
      description: "Weeks, not months",
      animation: "animate-float group-hover:animate-pop",
      color: "blue",
    },
    {
      icon: "🤖",
      title: "Custom AI & Agents",
      description: "Tailored intelligence",
      animation: "animate-float group-hover:animate-head-bobble",
      color: "purple",
    },
    {
      icon: "⚙️",
      title: "Domain Expertise",
      description: "Industry solutions",
      animation: "animate-slow-spin group-hover:animate-fast-spin",
      color: "cyan",
    },
    {
      icon: "🔗",
      title: "Automation for Scale",
      description: "Connected workflows",
      animation: "animate-float group-hover:animate-chain-reaction",
      color: "green",
    },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          <img src="/fallback-image.jpg" alt="Background" />
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Industrial Revolution 4.0</span>
            <span className="block gradient-text">From Vision to Reality</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            From concept to execution — we deliver scalable AI solutions that
            simplify complexity and accelerate growth.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {buttonData.map((button, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(button.onClick)}
                className={`px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 font-semibold text-lg border-2 ${button.className}`}
              >
                {button.text}
              </button>
            ))}
          </div>

          {/* Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {tileData.map((tile, index) => (
              <div
                key={index}
                className={`group bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-${tile.color}-500/20`}
              >
                <div className={`text-3xl mb-3 ${tile.animation}`}>
                  {tile.icon}
                </div>
                <h3
                  className={`text-white font-semibold mb-2 group-hover:text-${tile.color}-400 transition-colors duration-300`}
                >
                  {tile.title}
                </h3>
                <p className="text-slate-300 text-sm group-hover:translate-y-1 transition-transform duration-300">
                  {tile.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
