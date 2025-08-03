export default function FocusAreas() {
  const focusAreas = [
    {
      title: "LLMs & Agentic AI",
      description: "RAG systems, retrieval agents, hallucination prevention",
      gradient: "from-blue-50 to-blue-100",
      border: "border-blue-200"
    },
    {
      title: "Multimodal Intelligence",
      description: "Vision + language, audio-text pipelines, document QA",
      gradient: "from-cyan-50 to-cyan-100",
      border: "border-cyan-200"
    },
    {
      title: "Enterprise Automation",
      description: "Compliance, onboarding, invoice parsing, procurement flows",
      gradient: "from-violet-50 to-violet-100",
      border: "border-violet-200"
    },
    {
      title: "Vision AI",
      description: "OCR, segmentation, object detection, remote sensing",
      gradient: "from-emerald-50 to-emerald-100",
      border: "border-emerald-200"
    },
    {
      title: "Predictive Systems",
      description: "Forecasting, churn, scoring, anomaly detection",
      gradient: "from-orange-50 to-orange-100",
      border: "border-orange-200"
    },
    {
      title: "Knowledge Graphs",
      description: "Entity linking, knowledge discovery, context retrieval",
      gradient: "from-pink-50 to-pink-100",
      border: "border-pink-200"
    },
    {
      title: "Workflow Orchestration",
      description: "Airflow, Zapier, end-to-end automation",
      gradient: "from-indigo-50 to-indigo-100",
      border: "border-indigo-200"
    },
    {
      title: "Human-in-the-loop",
      description: "Feedback loops, audit trails, reviewable decisions",
      gradient: "from-teal-50 to-teal-100",
      border: "border-teal-200"
    }
  ];

  return (
    <section id="focus" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our <span className="gradient-text">Focus Areas</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Deep expertise across cutting-edge AI technologies and automation frameworks
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <div key={index} className={`bg-gradient-to-br ${area.gradient} rounded-xl p-6 border ${area.border} hover:shadow-lg transition-all duration-300`}>
              <h3 className="font-bold text-slate-900 mb-2">{area.title}</h3>
              <p className="text-sm text-slate-600">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
