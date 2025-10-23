"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Shield, Zap, Users, Gift, Globe } from 'lucide-react';

// ===== ANIMATION VARIANTS =====
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const containerFadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, duration: 0.8 }
  }
};

// ===== FEATURE CARD COMPONENT =====
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeIn}
    className="relative rounded-2xl p-6 sm:p-8 shadow-lg transition-all duration-500 hover:shadow-2xl group overflow-hidden"
    style={{
      background: 'var(--color-surface, rgba(255, 255, 255, 0.05))',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--color-border, rgba(255, 255, 255, 0.1))'
    }}
    whileHover={{
      scale: 1.03,
      y: -8,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }}
  >
    {/* Animated gradient background on hover */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 60%)',
      }}
    />

    {/* Icon container */}
    <div
      className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
      style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)'
      }}
    >
      <Icon
        className="w-8 h-8"
        style={{ color: 'var(--color-accent, #a78bfa)' }}
      />

      {/* Icon glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)',
          filter: 'blur(10px)'
        }}
      />
    </div>

    {/* Title */}
    <h3
      className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300"
      style={{ color: 'var(--color-text, #ffffff)' }}
    >
      {title}
    </h3>

    {/* Description */}
    <p
      className="text-base sm:text-lg leading-relaxed"
      style={{ color: 'var(--color-text, rgba(255, 255, 255, 0.75))' }}
    >
      {description}
    </p>

    {/* Bottom accent line */}
    <div
      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />

    {/* Corner decorative elements */}
    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
  </motion.div>
);

// ===== MAIN FEATURES SECTION COMPONENT =====
export default function FeaturesSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "Real-Time Messaging",
      description: "Instant message delivery with typing indicators and read receipts. Stay connected seamlessly."
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "End-to-end encryption keeps your conversations completely private and secure."
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Blazingly fast with optimized infrastructure. Zero lag, pure speed."
    },
    {
      icon: Users,
      title: "Smart Group Chats",
      description: "Create unlimited groups with polls, media galleries, and powerful admin controls."
    },
    {
      icon: Gift,
      title: "Rich Media Sharing",
      description: "Express yourself with thousands of stickers, GIFs, emojis, and HD media."
    },
    {
      icon: Globe,
      title: "Cross-Platform Sync",
      description: "Seamlessly switch between devices. Start on mobile, continue on desktop."
    }
  ];

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'var(--color-bg, #0a0a0f)',
        color: 'var(--color-text, #ffffff)'
      }}
    >
      {/* Static background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '450px',
            height: '450px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent)',
            filter: 'blur(140px)',
            top: '5%',
            left: '5%',
            opacity: 0.2
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25), transparent)',
            filter: 'blur(130px)',
            top: '50%',
            left: '75%',
            opacity: 0.18
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '350px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent)',
            filter: 'blur(120px)',
            top: '70%',
            left: '10%',
            opacity: 0.15
          }}
        />
      </div>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* ===== SECTION HEADING ===== */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-6">
            Powerful{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600">
              Features
            </span>
          </h2>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ opacity: 0.8 }}
          >
            Everything you need for seamless communication and connection.
          </p>
        </motion.div>

        {/* ===== FEATURES GRID ===== */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          variants={containerFadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--color-bg, #0a0a0f), transparent)'
        }}
      />
    </section>
  );
}
