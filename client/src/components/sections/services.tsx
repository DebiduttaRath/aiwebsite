export default function Services() {
  const services = [
    {
      icon: "⚙️",
      title: "Rapid MVP Development",
      description: "AI/automation MVPs in weeks, not months. Fast iteration and deployment."
    },
    {
      icon: "🤖",
      title: "Custom AI Solutions",
      description: "NLP, CV, predictive analytics, LLM fine-tuning, hallucination mitigation."
    },
    {
      icon: "🧩",
      title: "Agentic AI",
      description: "Contextual, goal-driven AI agents with multi-tool reasoning capabilities."
    },
    {
      icon: "🔄",
      title: "Process Automation",
      description: "RPA, scripting, API-based orchestration for seamless workflows."
    },
    {
      icon: "📊",
      title: "Smart Dashboards",
      description: "Real-time data, anomaly alerts, decision intelligence platforms."
    },
    {
      icon: "🔗",
      title: "Integration & APIs",
      description: "Seamless integration with existing systems and third-party services."
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            From LLMs to Logistics: <span className="gradient-text">Tailored AI. Delivered Fast.</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-blue-300">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
