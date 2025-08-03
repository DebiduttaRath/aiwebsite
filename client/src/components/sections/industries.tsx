export default function Industries() {
  const industries = [
    {
      icon: "🏥",
      title: "Healthcare",
      description: "Diagnostic assistants, clinical NLP, medical imaging, health data pipelines"
    },
    {
      icon: "📈",
      title: "Marketing & SEO",
      description: "AI content, SEO audits, campaign optimization"
    },
    {
      icon: "💰",
      title: "Finance & Ops",
      description: "Risk, fraud, anomaly detection, invoice parsing, compliance"
    },
    {
      icon: "🛒",
      title: "Retail & E-commerce",
      description: "Recommendation systems, demand forecasting, smart tagging"
    },
    {
      icon: "🚚",
      title: "Logistics",
      description: "Route optimization, delivery tracking, supplier intelligence"
    },
    {
      icon: "🏭",
      title: "Manufacturing",
      description: "Defect detection, RFQ automation, predictive maintenance"
    },
    {
      icon: "🛰️",
      title: "Space & Remote Sensing",
      description: "Satellite pipelines, NDVI, disaster response, land-use classification"
    }
  ];

  return (
    <section id="industries" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="gradient-text">Industries</span> We Transform
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Delivering AI solutions across diverse sectors with deep domain expertise
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{industry.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.title}</h3>
              <p className="text-slate-600 leading-relaxed">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
