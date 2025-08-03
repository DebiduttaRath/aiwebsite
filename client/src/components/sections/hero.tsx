export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="circuit-bg absolute inset-0"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">AI for the</span>
            <span className="block gradient-text">Real World</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We turn complex ideas into intelligent, scalable, production-grade solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              Build With Us
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-200 font-semibold text-lg"
            >
              See Our Work
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-200 font-semibold text-lg"
            >
              Talk to an Expert
            </button>
          </div>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-semibold mb-2">Rapid MVP Delivery</h3>
              <p className="text-slate-300 text-sm">Weeks, not months</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-white font-semibold mb-2">Custom AI & Agents</h3>
              <p className="text-slate-300 text-sm">Tailored intelligence</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🧭</div>
              <h3 className="text-white font-semibold mb-2">Domain-Specific Intelligence</h3>
              <p className="text-slate-300 text-sm">Industry expertise</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-white font-semibold mb-2">Automation for Scale</h3>
              <p className="text-slate-300 text-sm">Intelligent workflows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
