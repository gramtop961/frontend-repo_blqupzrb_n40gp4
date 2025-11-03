import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown } from 'lucide-react';

export default function ContactForm() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@abdullah.dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-6 backdrop-blur">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
          aria-label="Contact form"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name">
              <input
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400/50"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400/50"
              />
            </Field>
          </div>
          <Field label="Message">
            <textarea
              required
              rows={5}
              placeholder="Say hello!"
              className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400/50"
            />
          </Field>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 px-5 py-2 font-medium text-white shadow-lg shadow-pink-500/20"
              type="submit"
            >
              Send Message
            </motion.button>
          </div>
        </form>
      </div>

      <div className="flex flex-col gap-3">
        <SocialOrb href="https://github.com/" label="GitHub" color="purple">
          <Github className="h-5 w-5" />
        </SocialOrb>
        <SocialOrb href="https://linkedin.com/" label="LinkedIn" color="cyan">
          <Linkedin className="h-5 w-5" />
        </SocialOrb>
        <button
          onClick={copyEmail}
          className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3 text-left hover:bg-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-9 w-9 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{copied ? 'Copied!' : 'Copy Email'}</div>
              <div className="text-xs text-white/70">hello@abdullah.dev</div>
            </div>
          </div>
        </button>
        <a
          href="#"
          className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3 text-left hover:bg-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="grid place-items-center h-9 w-9 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
              <FileDown className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Download CV</div>
              <div className="text-xs text-white/70">PDF • Latest</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs uppercase tracking-wider text-white/60">{label}</div>
      {children}
    </label>
  );
}

function SocialOrb({ href, label, color = 'cyan', children }) {
  const colorMap = {
    cyan: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
    purple: 'bg-purple-500/20 text-purple-200 border-purple-400/30',
    pink: 'bg-pink-500/20 text-pink-200 border-pink-400/30',
    blue: 'bg-blue-500/20 text-blue-200 border-blue-400/30',
  };
  const c = colorMap[color] || colorMap.cyan;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-xl border border-white/15 bg-white/5 p-3 text-left hover:bg-white/10"
    >
      <div className="flex items-center gap-3">
        <div className={`grid place-items-center h-9 w-9 rounded-full ${c}`}>
          {children}
        </div>
        <div className="font-medium">{label}</div>
      </div>
      <motion.div
        className="text-white/50"
        initial={{ opacity: 0, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        ↗
      </motion.div>
    </a>
  );
}
