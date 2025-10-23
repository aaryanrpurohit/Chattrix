"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Animation variants for reusable animations
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

// Floating shape component for background
const FloatingShape = ({ delay = 0, duration = 20, size = 300, color = "purple", blur = 100, top, left, opacity = 0.15 }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      background: `radial-gradient(circle, ${color}, transparent)`,
      filter: `blur(${blur}px)`,
      top,
      left,
      opacity
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// Chat bubble component for illustration area
const ChatBubble = ({ delay = 0, text, position }) => (
  <motion.div
    className="absolute backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg"
    style={{
      ...position,
      background: 'var(--color-surface, rgba(255, 255, 255, 0.1))',
      border: '1px solid var(--color-border, rgba(255, 255, 255, 0.2))'
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -8, 0]
    }}
    transition={{
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
      y: { duration: 6, delay, repeat: Infinity, ease: "easeInOut" }
    }}
  >
    <p className="text-sm" style={{ color: 'var(--color-text, #ffffff)' }}>{text}</p>
  </motion.div>
);

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center pt-20 sm:pt-0"
      style={{
        background: 'var(--color-bg, #0a0a0f)',
        color: 'var(--color-text, #ffffff)'
      }}
    >
      {/* ===== ANIMATED BACKGROUND SHAPES ===== */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating gradient circles */}
        <FloatingShape
          delay={0}
          duration={25}
          size={400}
          color="rgba(139, 92, 246, 0.3)"
          blur={120}
          top="10%"
          left="-10%"
          opacity={0.2}
        />
        <FloatingShape
          delay={2}
          duration={20}
          size={350}
          color="rgba(99, 102, 241, 0.3)"
          blur={100}
          top="60%"
          left="70%"
          opacity={0.15}
        />
        <FloatingShape
          delay={4}
          duration={30}
          size={300}
          color="rgba(168, 85, 247, 0.2)"
          blur={110}
          top="30%"
          left="80%"
          opacity={0.18}
        />
        <FloatingShape
          delay={1}
          duration={22}
          size={250}
          color="rgba(79, 70, 229, 0.25)"
          blur={90}
          top="70%"
          left="10%"
          opacity={0.12}
        />
        <FloatingShape
          delay={3}
          duration={28}
          size={200}
          color="rgba(147, 51, 234, 0.3)"
          blur={80}
          top="15%"
          left="50%"
          opacity={0.1}
        />
      </div>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-12 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* ===== LEFT COLUMN: TEXT CONTENT ===== */}
          <div className="flex-1 text-center lg:text-left space-y-8">

            {/* Headline with gradient brand name */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-snug tracking-tight"
              {...slideInLeft}
            >
              Connect Instantly with{' '}
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600"
                style={{ display: 'inline-block' }}
              >
                Chattrix
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience the future of communication. Real-time messaging,
              seamless collaboration, and connections that matter—all in one beautiful platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Primary Button - Glassmorphic */}
              <motion.a
                href="/Login"
                className="px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: 'rgba(139, 92, 246, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.a>

              {/* Secondary Button - Outline Glass */}
              <motion.button
                className="px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(139, 92, 246, 0.5)',
                  backdropFilter: 'blur(10px)',
                  color: 'var(--color-text, #ffffff)'
                }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.8)' }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

          </div>

          {/* ===== RIGHT COLUMN: HERO ILLUSTRATION ===== */}
          <motion.div
            className="flex-1 relative w-full max-w-md sm:max-w-lg"
            {...slideInRight}
          >
            {/* Main illustration container with floating animation */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -15, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Hero Illustration - Chat Interface Mockup */}
              <div
                className="relative w-full aspect-square rounded-3xl shadow-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Chat UI Mockup */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500"></div>
                    <div>
                      <div className="h-3 w-24 bg-white/20 rounded"></div>
                      <div className="h-2 w-16 bg-white/10 rounded mt-2"></div>
                    </div>
                  </div>

                  {/* Message bubbles */}
                  <div className="space-y-3 mt-6">
                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 max-w-[80%]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      <div className="h-2 w-32 bg-white/30 rounded mb-2"></div>
                      <div className="h-2 w-24 bg-white/30 rounded"></div>
                    </motion.div>

                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl rounded-tr-sm p-4 max-w-[80%] ml-auto"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                    >
                      <div className="h-2 w-28 bg-white/40 rounded mb-2"></div>
                      <div className="h-2 w-20 bg-white/40 rounded"></div>
                    </motion.div>

                    <motion.div
                      className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm p-4 max-w-[70%]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                    >
                      <div className="h-2 w-36 bg-white/30 rounded"></div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Floating chat bubbles around illustration */}
              <ChatBubble
                delay={0.8}
                text="💬 Real-time"
                position={{ top: '5%', right: '-5%' }}
              />
              <ChatBubble
                delay={1.2}
                text="🔒 Secure"
                position={{ bottom: '20%', left: '-8%' }}
              />
              <ChatBubble
                delay={1.6}
                text="⚡ Fast"
                position={{ bottom: '-5%', right: '10%' }}
              />

              {/* Glow effect under illustration */}
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full opacity-30 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent)'
                }}
              ></div>
            </motion.div>

            {/* Floating particles around illustration */}
            <motion.div
              className="absolute top-10 right-0 w-3 h-3 bg-purple-400 rounded-full opacity-60"
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 0.3, 0.6]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 left-5 w-2 h-2 bg-indigo-400 rounded-full opacity-60"
              animate={{
                y: [0, 15, 0],
                opacity: [0.6, 0.3, 0.6]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/3 -left-5 w-4 h-4 bg-purple-300 rounded-full opacity-40"
              animate={{
                y: [0, -15, 0],
                x: [0, 8, 0],
                opacity: [0.4, 0.2, 0.4]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

        </div>
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
