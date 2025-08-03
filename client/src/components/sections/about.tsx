export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="gradient-text">Democratizing AI,</span> One Workflow at a Time
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We're a fast-growing AI-first, automation-driven company bridging the gap between cutting-edge research and real-world impact. From prototypes to full-stack production systems, we craft intelligent workflows that drive results—across healthcare, retail, space, finance, and more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">🎯 Our Vision</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Turn complexity into clarity and ideas into intelligent systems.
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">🚀 Our Mission</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Accelerate digital transformation using AI, automation, and domain expertise—unlocking efficiency and new revenue at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
