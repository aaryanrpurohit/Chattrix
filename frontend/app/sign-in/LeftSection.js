import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Gamepad2, Users } from 'lucide-react';
import Image from 'next/image'

// --- FEATURE DATA ---
const features = [
  {
    icon: MessageSquare,
    title: 'Fast Chat',
    description: 'Send messages and talk with friends instantly, without any delays. Safe and private.',
    delay: 0.5
  },
  {
    icon: Users,
    title: 'Friend Groups',
    description: 'Create your own spaces and hang out with friends. You decide the rules.',
    delay: 0.7
  },
  {
    icon: Gamepad2,
    title: 'Group Games',
    description: 'Start games together and play smoothly with friends, no lag.',
    delay: 0.9
  },
];

// --- FRAMER MOTION VARIANTS ---
const sidebarVariants = {
  hidden: { x: '-110%', opacity: 0 },
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 90,
      mass: 0.8,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const taglineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { delay: 0.4, type: 'tween', duration: 0.6 } },
};

// --- SUB COMPONENTS ---
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    transition={{ delay, type: 'spring', stiffness: 120, damping: 20 }}
    className="p-4 sm:p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]
               shadow-xl shadow-[var(--color-accent)]/10
               hover:border-[var(--color-accent)] hover:scale-[1.02]
               hover:shadow-[var(--color-accent)]/40
               transition-all duration-300 relative overflow-hidden cursor-pointer group"
  >
    <div className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ borderColor: 'var(--color-accent)', boxShadow: '0 0 15px var(--color-accent)' }}>
    </div>

    <div className="flex items-start space-x-4 relative z-10">
      <div className="p-3 bg-[var(--color-accent)] rounded-lg shadow-lg shadow-[var(--color-accent)]/70 flex-shrink-0">
        <Icon size={24} className="text-[var(--color-text)]" />
      </div>

      <div>
        <h3 className="font-extrabold text-lg sm:text-2xl text-[var(--color-text)] tracking-wider uppercase leading-tight">{title}</h3>
        <p className="mt-1 text-sm text-gray-400 relative z-10">{description}</p>
      </div>
    </div>
  </motion.div>
);

// --- MAIN COMPONENT ---
export default function LoginSplash({ logoPath = '/assets/images/logo.png' }) {
  return (
    <div className="flex justify-center items-center h-screen font-inter text-[var(--color-text)] relative overflow-hidden p-10 px-20">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-[var(--color-bg)]">
        <div className="w-1/2 h-full opacity-10" style={{ backgroundImage: `repeating-linear-gradient(0deg, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, var(--color-border), var(--color-border) 1px, transparent 1px, transparent 40px)` }}></div>
      </div>

      {/* LOGIN SPLASH (HALF SCREEN) */}
      <motion.nav
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-full w-1/2l  flex flex-col p-6 sm:p-12
                   rounded-3xl bg-[var(--color-surface)]/95
                   border-2 border-[var(--color-accent)]
                   shadow-2xl shadow-[var(--color-accent)]/50 overflow-hidden"
      >
        {/* HEADER / APP LOGO */}
        <motion.div variants={itemVariants}>
          <h1 className="flex gap-3 items-center text-3xl sm:text-5xl font-extrabold tracking-widest text-[var(--color-accent)] uppercase">
            <Image src={logoPath} alt="Chattrix Logo" width={50} height={50} className="w-12 h-12 p-1 bg-[var(--color-accent)] rounded-md rotate-[-15deg] object-contain"/>
            CHATTRIX
          </h1>

          <motion.p
            variants={taglineVariants}
            className="mt-4 text-lg sm:text-xl font-medium text-[var(--color-text)] border-l-4 border-[var(--color-accent)] pl-4 leading-snug"
            style={{ textShadow: `0 0 5px var(--color-accent)` }}>
            Connect. Coordinate. Dominate.
          </motion.p>
        </motion.div>

        {/* FEATURE HIGHLIGHTS */}
        <div className="flex-grow space-y-6 flex flex-col pt-12 relative z-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </motion.nav>
    </div>
  );
}
