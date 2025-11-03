import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
  exit: { opacity: 0, scale: 0.98, filter: 'blur(4px)', transition: { duration: 0.2 } },
};

export default function SectionOverlay({ open, onClose, accent = 'cyan', title, children }) {
  const accentMap = {
    cyan: 'from-cyan-400/20 to-cyan-600/10 border-cyan-300/30',
    purple: 'from-purple-400/20 to-purple-600/10 border-purple-300/30',
    blue: 'from-blue-400/20 to-blue-600/10 border-blue-300/30',
    pink: 'from-pink-400/20 to-pink-600/10 border-pink-300/30',
  };
  const accentClasses = accentMap[accent] || accentMap.cyan;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className={`relative mx-4 w-full max-w-5xl rounded-2xl border bg-gradient-to-br ${accentClasses} text-white shadow-2xl`}
            variants={panelVariants}
          >
            <div className="flex items-center justify-between p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-wide">{title}</h2>
              <button
                onClick={onClose}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-white/90 hover:bg-white/10"
                aria-label="Back to hub"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
            <div className="px-4 pb-6 md:px-6 md:pb-8">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
