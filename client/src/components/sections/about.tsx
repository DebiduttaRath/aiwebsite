export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Aswini Kumar Swain",
      role: "Co Founder",
      imageUrl: "/team/aswini_swain.jpeg",
      linkedinURL: "https://www.linkedin.com/in/aswini09/",
    },
    {
      id: 2,
      name: "Himansu Sekhar Pradhan",
      role: "Co Founder",
      imageUrl: "/team/himanshu_pradhan.jpeg",
      linkedinURL: "https://www.linkedin.com/in/himansu-pradhan-6b151472/",
    },
    {
      id: 3,
      name: "Want to join our team",
      role: "Earthminder",
      imageUrl: "/logo.png",
      linkedinURL: "https://www.linkedin.com/in/earth-minds-ai/",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="gradient-text">Democratizing AI,</span> One
            Workflow at a Time
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We're a fast-growing AI-first, automation-driven company bridging
            the gap between cutting-edge research and real-world impact. From
            prototypes to full-stack production systems, we craft intelligent
            workflows that drive results—across healthcare, retail, space,
            finance, and more.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              🎯 Our Vision
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Turn complexity into clarity and ideas into intelligent systems.
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-8 border border-violet-100 h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              🚀 Our Mission
            </h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              Accelerate digital transformation using AI, automation, and domain
              expertise—unlocking efficiency and new revenue at scale.
            </p>
          </div>
        </div>

        {/* Team Section - Integrated Design */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            🏆 Our Team -{" "}
            <span className="gradient-text">The EarthMinders</span>
          </h3>
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            We're building a world-class team to solve challenging AI problems.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                    src={member.imageUrl}
                    alt={member.name}
                  />
                  <h3 className="text-lg font-bold text-slate-900">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1 mb-3">
                    {member.role}
                  </p>
                  <a
                    href={member.linkedinURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#0A66C2"
                        d="M20.452 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.852-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667h-3.554V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.367-1.852c3.6 0 4.266 2.369 4.266 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124a2.062 2.062 0 0 1 0 4.124zM6.967 20.452H3.707V9h3.26v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
