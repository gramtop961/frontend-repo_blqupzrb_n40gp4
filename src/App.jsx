import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hub from './components/Hub';
import SectionOverlay from './components/SectionOverlay';
import ProjectsCarousel from './components/ProjectsCarousel';
import ContactForm from './components/ContactForm';

function App() {
  const [section, setSection] = React.useState(null); // 'about' | 'skills' | 'projects' | 'contact'

  // Global keyboard navigation
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSection(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden font-['Inter',system-ui]">
      {/* Hub */}
      <AnimatePresence initial={false}>
        {!section && (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hub onSelect={setSection} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* About */}
      <SectionOverlay open={section === 'about'} onClose={() => setSection(null)} accent="cyan" title="About Abdullah">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur"
          >
            <p className="text-white/85 leading-relaxed">
              I craft immersive web experiences that blend performance, aesthetics, and delightful interactions. My philosophy: fewer pages, more presence. I love turning complex ideas into intuitive, cinematic interfaces.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {['UI Motion', '3D Web', 'Systems Thinking', 'Developer Experience'].map((t) => (
                <motion.span
                  whileHover={{ scale: 1.06 }}
                  key={t}
                  className="cursor-pointer rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid gap-4"
          >
            <Stat title="Years" value={4} color="cyan" />
            <Stat title="Projects" value={30} color="purple" />
            <Stat title="Coffees" value={1024} color="pink" />
          </motion.div>
        </div>
      </SectionOverlay>

      {/* Skills */}
      <SectionOverlay open={section === 'skills'} onClose={() => setSection(null)} accent="purple" title="Skills & Stack">
        <div className="grid gap-6 md:grid-cols-3">
          <SkillCluster title="Languages" color="purple" skills={['TypeScript', 'JavaScript', 'Python', 'SQL']} />
          <SkillCluster title="Frameworks" color="cyan" skills={['React', 'Next.js', 'FastAPI', 'Framer Motion']} />
          <SkillCluster title="Tools & DevOps" color="pink" skills={['Git', 'Vercel', 'Docker', 'CI/CD']} />
        </div>
      </SectionOverlay>

      {/* Projects */}
      <SectionOverlay open={section === 'projects'} onClose={() => setSection(null)} accent="blue" title="Projects Gallery">
        <ProjectsCarousel />
      </SectionOverlay>

      {/* Contact */}
      <SectionOverlay open={section === 'contact'} onClose={() => setSection(null)} accent="pink" title="Get in Touch">
        <ContactForm />
      </SectionOverlay>
    </div>
  );
}

function Stat({ title, value, color = 'cyan' }) {
  const colorMap = {
    cyan: 'from-cyan-400 to-cyan-200',
    purple: 'from-purple-400 to-purple-200',
    pink: 'from-pink-400 to-pink-200',
  };
  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur">
      <div className={`bg-gradient-to-r ${colorMap[color]} bg-clip-text text-4xl font-extrabold text-transparent`}>
        {value}
      </div>
      <div className="text-sm text-white/70">{title}</div>
    </div>
  );
}

function SkillCluster({ title, skills, color = 'cyan' }) {
  const borderMap = {
    cyan: 'border-cyan-400/30',
    purple: 'border-purple-400/30',
    pink: 'border-pink-400/30',
  };
  const glowMap = {
    cyan: 'shadow-[0_0_24px_rgba(0,245,255,0.15)]',
    purple: 'shadow-[0_0_24px_rgba(181,55,242,0.15)]',
    pink: 'shadow-[0_0_24px_rgba(255,0,110,0.15)]',
  };
  return (
    <div className={`rounded-xl border ${borderMap[color]} bg-white/5 p-4 backdrop-blur ${glowMap[color]}`}>
      <div className="mb-3 text-sm font-semibold tracking-wider text-white/80">{title}</div>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <motion.span
            whileHover={{ rotate: -2, y: -2 }}
            key={s}
            className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/80"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default App;
