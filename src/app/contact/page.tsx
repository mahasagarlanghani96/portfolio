"use client";

import { useState } from "react";
import {
  Mail,
  Briefcase,
  MessageCircle,
  MapPin,
  Send,
  ExternalLink,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { personalInfo, socialLinks } from "@/data";
import { generateMailtoLink } from "@/lib/utils";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    description: "Best for detailed inquiries",
  },
  {
    icon: Briefcase,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: socialLinks.find((l) => l.platform === "LinkedIn")?.url || "#",
    description: "Professional networking",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: personalInfo.phone,
    href: socialLinks.find((l) => l.platform === "WhatsApp")?.url || "#",
    description: "Quick messages",
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: undefined,
    description: "Available for remote work worldwide",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = formData.subject || `Portfolio inquiry from ${formData.name}`;
    const body = `Hi Mahasagar,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`;
    const mailto = generateMailtoLink(personalInfo.email, subject, body);
    window.open(mailto, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <>
      <Section className="pt-32">
        <SectionHeader
          label="Contact"
          title="Let's Connect"
          description="Have a project in mind, need a QA leader, or just want to discuss quality engineering? Reach out through any of these channels."
        />

        <div className="mx-auto max-w-5xl">
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, i) => (
              <AnimateIn key={method.label} delay={i * 0.08}>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.label !== "Email" ? "_blank" : undefined}
                    rel={method.label !== "Email" ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    <Card hover className="text-center">
                      <method.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                      <p className="font-semibold text-text-primary">{method.label}</p>
                      <p className="mt-1 text-sm text-accent">{method.value}</p>
                      <p className="mt-1 text-xs text-text-tertiary">
                        {method.description}
                      </p>
                    </Card>
                  </a>
                ) : (
                  <Card className="text-center">
                    <method.icon className="mx-auto mb-3 h-8 w-8 text-accent" />
                    <p className="font-semibold text-text-primary">{method.label}</p>
                    <p className="mt-1 text-sm text-text-secondary">{method.value}</p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      {method.description}
                    </p>
                  </Card>
                )}
              </AnimateIn>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-bg-secondary">
        <div className="mx-auto max-w-2xl">
          <AnimateIn>
            <Card className="p-8">
              <h2 className="mb-2 text-xl font-semibold text-text-primary">
                Send a Message
              </h2>
              <p className="mb-6 text-sm text-text-tertiary">
                This form opens your email client with a pre-filled message. No data is stored on this website.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    Name <span className="text-status-fail">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-xs text-status-fail" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    Email <span className="text-status-fail">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="your@email.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-status-fail" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-text-primary"
                  >
                    Message <span className="text-status-fail">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full resize-y rounded-xl border border-border bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder="Your message..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-status-fail" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" />
                  Open in Email Client
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </form>
            </Card>
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
