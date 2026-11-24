"use client";

import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { personalInfo, socialLinks } from "@/data";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function ContactCTA() {
  return (
    <Section id="contact" className="relative overflow-hidden">
      <GradientBlob colors={["#A78BFA", "#F472B6", "#00E5FF"]} />

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4 inline-block"
          >
            <Sparkles className="h-8 w-8 text-[var(--accent-tertiary)]" />
          </motion.div>

          <span className="mb-3 inline-block rounded-full border border-border-accent bg-bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent shimmer">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Let&apos;s Talk Quality &{" "}
            <span className="gradient-text-animated">Delivery</span>
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            Whether you need a QA leader, a delivery-focused PM, or just want to discuss
            how quality engineering can improve your software.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] px-7 py-3.5 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Mail className="h-4 w-4" />
                Email Me
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={socialLinks.find((l) => l.platform === "LinkedIn")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border-accent bg-bg-card px-7 py-3.5 font-semibold text-text-primary transition-all hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-lg active:scale-[0.97]"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={socialLinks.find((l) => l.platform === "WhatsApp")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-bg-card px-7 py-3.5 font-semibold text-text-secondary transition-all hover:border-[#25D366] hover:text-[#25D366] hover:shadow-md active:scale-[0.97]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
