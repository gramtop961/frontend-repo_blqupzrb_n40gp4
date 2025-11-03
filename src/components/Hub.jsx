import React from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { User, Wrench, Rocket, Mail } from 'lucide-react';

const orbVariants = {
  initial: { opacity: 0, scale: 0.6, y: 20 },
  animate: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: [0, -8, 0, 6, 0],
    transition: {
      delay,
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  }),
  hover: { scale: 1.12, boxShadow: '0 0 40px rgba(0,245,255,0.6)' },
};

export default function Hub({ onSelect }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0a0914] text-white">
      {/* Background Spline scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay to enrich colors without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,55,242,0.25),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(0,245,255,0.2),transparent_50%)]" />

      {/* Center name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, rotateX: [0, 5, -5, 0], rotateY: [0, -5, 5, 0] }}
          transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatType: 'mirror', repeatDelay: 2 }}
          className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-white to-pink-300 drop-shadow-lg select-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center"
        >
          Abdullah Mohamed
        </motion.h1>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[28rem] w-[28rem] md:h-[34rem] md:w-[34rem]">
          {/* About */}
          <motion.button
            className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 p-4 md:p-5 text-cyan-200 shadow-[0_0_24px_rgba(0,245,255,0.35)]"
            initial="initial"
            animate={orbVariants.animate(0.1)}
            whileHover="hover"
            onClick={() => onSelect('about')}
            aria-label="About"
          >
            <User className="h-6 w-6 md:h-7 md:w-7" />
          </motion.button>

          {/* Skills */}
          <motion.button
            className="absolute top-1/3 -left-4 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-400/40 p-4 md:p-5 text-purple-200 shadow-[0_0_24px_rgba(181,55,242,0.35)]"
            initial="initial"
            animate={orbVariants.animate(0.25)}
            whileHover="hover"
            onClick={() => onSelect('skills')}
            aria-label="Skills"
          >
            <Wrench className="h-6 w-6 md:h-7 md:w-7" />
          </motion.button>

          {/* Projects */}
          <motion.button
            className="absolute top-1/2 -translate-y-1/2 -right-4 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/40 p-4 md:p-5 text-blue-200 shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            initial="initial"
            animate={orbVariants.animate(0.4)}
            whileHover="hover"
            onClick={() => onSelect('projects')}
            aria-label="Projects"
          >
            <Rocket className="h-6 w-6 md:h-7 md:w-7" />
          </motion.button>

          {/* Contact */}
          <motion.button
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-400/40 p-4 md:p-5 text-pink-200 shadow-[0_0_24px_rgba(255,0,110,0.35)]"
            initial="initial"
            animate={orbVariants.animate(0.55)}
            whileHover="hover"
            onClick={() => onSelect('contact')}
            aria-label="Contact"
          >
            <Mail className="h-6 w-6 md:h-7 md:w-7" />
          </motion.button>
        </div>
      </div>

      {/* Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs md:text-sm text-white/70">
        Click the glowing orbs to explore • ESC to return
      </div>
    </div>
  );
}
