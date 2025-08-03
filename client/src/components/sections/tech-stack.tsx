import { CheckCircle, Database, Zap, Cloud, BarChart, Code } from "lucide-react";

export default function TechStack() {
  const techCategories = [
    {
      icon: CheckCircle,
      title: "AI/ML",
      description: "PyTorch, Transformers, LangChain, OpenAI",
      gradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-600"
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Robocorp, Playwright, Python, Selenium",
      gradient: "from-cyan-50 to-cyan-100",
      iconBg: "bg-cyan-600"
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Airflow, Kafka, BigQuery, Snowflake",
      gradient: "from-violet-50 to-violet-100",
      iconBg: "bg-violet-600"
    },
    {
      icon: Cloud,
      title: "Deployment",
      description: "Docker, Kubernetes, AWS, GCP",
      gradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-600"
    },
    {
      icon: BarChart,
      title: "Frontend & Dashboards",
      description: "Streamlit, Dash, Grafana, Power BI",
      gradient: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-600"
    },
    {
      icon: Code,
      title: "Integration",
      description: "FastAPI, REST, GraphQL, Zapier",
      gradient: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-600"
    }
  ];

  return (
    <section id="tech" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Cutting-edge technologies for robust, scalable AI solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className={`bg-gradient-to-br ${category.gradient} rounded-xl p-8 border border-slate-200`}>
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 ${category.iconBg} rounded-lg flex items-center justify-center mr-3`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                </div>
                <p className="text-slate-700">{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
