"use client";

import { ExternalLink, Mail, MessageCircle, Heart } from "lucide-react";
import { motion } from "motion/react";
import { personalInfo, socialLinks } from "@/data";

const iconMap: Record<string, React.ReactNode> = {
  LinkedIn: <ExternalLink className="h-5 w-5" />,
  Email: <Mail className="h-5 w-5" />,
  WhatsApp: <MessageCircle className="h-5 w-5" />,
};

const linkColors = ["#00E5FF", "#A78BFA", "#F472B6"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-secondary relative">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold gradient-text-animated"
            >
              ML
            </button>
            <p className="mt-2 max-w-xs text-sm text-text-tertiary">
              Quality Leadership. Technical Delivery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-tertiary transition-all"
                style={{
                  "--hover-color": linkColors[i],
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = linkColors[i];
                  (e.currentTarget as HTMLElement).style.color = linkColors[i];
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${linkColors[i]}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
                aria-label={link.label}
              >
                {iconMap[link.platform]}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-text-tertiary flex items-center justify-center gap-1">
            &copy; 2026 {personalInfo.name}. Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-3.5 w-3.5 text-[#F472B6] inline-block" />
            </motion.span>
            and quality in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
