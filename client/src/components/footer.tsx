import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
// import Image from "next/image";

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
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      setNewsletterEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api", "newsletter"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      newsletterMutation.mutate(newsletterEmail);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Company Info + Team */}
          <div className="md:col-span-2 space-y-8">
            {/* Company Info */}
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">
                earthminds.ai
              </div>
              <p className="text-slate-400">
                Turning complex ideas into intelligent, scalable solutions.
              </p>
            </div>

            {/* Our Team - Compact horizontal layout */}
            <div>
              <h3 className="text-white font-semibold mb-4">Our Team</h3>
              <div className="flex flex-wrap gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 min-w-[160px]"
                  >
                    <div className="w-20 h-20 overflow-hidden rounded-full border border-slate-700">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="object-cover w-full h-full"
                        // style={{ width: 20, height: 20 }}
                      />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium line-clamp-1">
                        {member.name.split(" ")[0]}
                      </p>
                      <p className="text-slate-400 text-xs">{member.role}</p>
                      <a href={member.linkedinURL}>
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

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["home", "about", "services"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-400 mb-4">
              Stay updated with the latest AI insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} earthminds.ai. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
