import React, { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    title: 'Immersive Portfolio Space',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    tech: ['React', 'Framer Motion', 'Three.js'],
    demo: '#',
    code: '#',
    desc: 'A single-viewport, no-scroll portfolio with spatial navigation and cinematic transitions.'
  },
  {
    title: 'Realtime Dashboard',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    tech: ['Next.js', 'Tailwind', 'Socket.IO'],
    demo: '#',
    code: '#',
    desc: 'Live metrics, multi-source aggregation, and animated data visualizations.'
  },
  {
    title: 'AI Assistant Playground',
    image: 'https://images.unsplash.com/photo-1668561791354-b299b018abbc?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxBSSUyMEFzc2lzdGFudCUyMFBsYXlncm91bmR8ZW58MHwwfHx8MTc2MjIwNzczNXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    tech: ['Python', 'FastAPI', 'OpenAI'],
    demo: '#',
    code: '#',
    desc: 'Conversational tools with modular skills, streaming UI, and prompt routing.'
  },
];

export default function ProjectsCarousel({ onIndexChangeExternal }) {
  const [index, setIndex] = useState(0);
  const count = projectsData.length;

  const go = useCallback((dir) => {
    setIndex((i) => {
      const next = (i + dir + count) % count;
      onIndexChangeExternal && onIndexChangeExternal(next);
      return next;
    });
  }, [count, onIndexChangeExternal]);

  const current = projectsData[index];

  const cardVariants = {
    initial: { opacity: 0, y: 20, rotateX: -6 },
    animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, rotateX: 6, transition: { duration: 0.25 } },
  };

  // Expose keyboard helpers
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  return (
    <div className="relative w-full">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <motion.img
          key={current.title}
          src={current.image}
          alt={current.title}
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <motion.h3 className="text-lg md:text-xl font-semibold">
            {current.title}
          </motion.h3>
          <p className="mt-1 text-white/70 text-sm md:text-base">{current.desc}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {current.tech.map((t) => (
              <span key={t} className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            className="rounded-full border border-white/20 bg-white/5 p-2 text-white/80 hover:bg-white/10"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="rounded-full border border-white/20 bg-white/5 p-2 text-white/80 hover:bg-white/10"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <a
            href={current.demo}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200 hover:bg-cyan-500/20"
          >
            <ExternalLink className="h-4 w-4" /> Demo
          </a>
          <a
            href={current.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1.5 text-purple-200 hover:bg-purple-500/20"
          >
            <Github className="h-4 w-4" /> Code
          </a>
        </div>
      </div>
    </div>
  );
}
