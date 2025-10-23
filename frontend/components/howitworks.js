"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, MessageSquare, Sparkles, Award } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 120,
      damping: 20
    }
  }
};

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Sign up instantly and personalize your profile in seconds."
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Join or Create Rooms",
    description: "Explore trending chats or start your own private community."
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Chat, Play & Connect",
    description: "Enjoy real-time messaging, games, and voice with your friends."
  },
  {
    number: "04",
    icon: Award,
    title: "Earn XP & Unlock Rewards",
    description: "Stay active to collect badges, levels, and exclusive perks."
  }
];

export default function HowItWorks() {
  return (
    <section
      className="relative min-h-screen py-16 md:py-24 px-6 md:px-12 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Background animated shapes */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full -z-10 pointer-events-none"
        style={{
          background: 'var(--color-accent)',
          filter: 'blur(120px)',
          opacity: 0.2
        }}
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-32 right-10 w-96 h-96 rounded-full -z-10 pointer-events-none"
        style={{
          background: 'var(--color-accent)',
          filter: 'blur(140px)',
          opacity: 0.15
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Main content container */}
      <div className="max-w-7xl mx-auto">

        {/* Header block */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="uppercase tracking-wide font-medium text-sm md:text-base mb-3"
            style={{ color: 'var(--color-accent)' }}
          >
            STEP BY STEP
          </p>

          <h2
            className="font-bold text-4xl md:text-5xl mb-4"
            style={{ color: 'var(--color-text)' }}
          >
            How Chattrix Works
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'var(--color-text)', opacity: 0.8 }}
          >
            Get started in four simple steps and experience real-time magic.
          </p>
        </motion.div>

        {/* Connecting line (desktop only) */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[280px] w-[70%] h-[2px] -z-10">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(to right, transparent, var(--color-accent), transparent)`,
              opacity: 0.4
            }}
          />
        </div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 justify-center items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="relative rounded-3xl p-6 md:p-8 shadow-lg transition-all duration-300 group"
              style={{
                background: 'var(--color-surface)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--color-border)'
              }}
              whileHover={{
                scale: 1.03,
                y: -8,
                boxShadow: `0 20px 40px rgba(108, 99, 255, 0.3)`
              }}
            >
              {/* Background icon */}
              <step.icon
                className="absolute top-6 right-6 w-20 h-20 opacity-10 pointer-events-none"
                style={{ color: 'var(--color-accent)' }}
              />

              {/* Number badge */}
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold mb-4 relative z-10"
                style={{
                  border: '1px solid var(--color-accent)',
                  color: 'var(--color-accent)',
                  background: 'transparent'
                }}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                {step.number}
              </motion.div>

              {/* Title */}
              <h3
                className="font-semibold text-xl md:text-2xl mb-2"
                style={{ color: 'var(--color-text)' }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: 'var(--color-text)', opacity: 0.8 }}
              >
                {step.description}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(108, 99, 255, 0.1), transparent 70%)'
                }}
              />
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

