import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { submitContactForm } from "@/lib/api";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  project: z.string().min(1, "Project description is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      project: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description:
          error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

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

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

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
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to turn your AI idea into{" "}
            <span className="gradient-text">impact?</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Let's discuss how we can transform your business with intelligent
            automation
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="w-full rounded-lg bg-white text-gray-800 placeholder-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          className="w-full rounded-lg bg-white text-gray-800 placeholder-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Company</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your company"
                          className="w-full rounded-lg bg-white text-gray-800 placeholder-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Project Brief
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Tell us about your AI project..."
                          className="w-full rounded-lg bg-white text-gray-800 placeholder-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm h-32 resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-red-300" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={contactMutation.isPending}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg"
              >
                {contactMutation.isPending ? "Sending..." : "Schedule a Call"}
              </Button>
            </form>
          </Form>

          {/* <div className="text-center mt-8">
            <button
              onClick={() => scrollToSection("contact")}
              className="border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-200 font-semibold"
            >
              Book a Free Discovery Call
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
