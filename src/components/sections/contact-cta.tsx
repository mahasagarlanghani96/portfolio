"use client";

import { Mail, ExternalLink, MessageCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Section } from "@/components/ui/section";
import { MagneticButton } from "@/components/interactive/magnetic-button";
import { GradientBlob } from "@/components/interactive/gradient-blob";
import { personalInfo, socialLinks } from "@/data";

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
                className="inline-flex items-center gap-2 rounded-2xl border border-border-accent bg-bg-card px-7 py-3.5 font-semibold text-text-primary transition-all hover:border-accent hover:shadow-lg active:scale-[0.97]"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href={socialLinks.find((l) => l.platform === "WhatsApp")?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-bg-card px-7 py-3.5 font-semibold text-text-secondary transition-all hover:border-border-accent hover:text-accent hover:shadow-md active:scale-[0.97]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
