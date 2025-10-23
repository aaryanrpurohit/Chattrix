"use client";

import React from 'react';
import { useReducedMotion , motion } from 'framer-motion';

import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const cardRef = React.useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section
      className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Animated background orbs */}
      <motion.div
        animate={shouldReduceMotion ? {} :{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          backgroundColor: "var(--color-accent)",
          opacity: 0.15
        }}
      />

      <motion.div
        animate={shouldReduceMotion ? {} :{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-accent), transparent)",
          opacity: 0.12
        }}
      />

      {/* Main content container */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Glassmorphic card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="relative rounded-3xl md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl overflow-hidden group"
          style={{
            background: "var(--color-surface)",
            backdropFilter: "blur(40px)",
            border: "1px solid var(--color-border)"
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Mouse-tracking gradient spotlight */}
          {isHovering && (
  <>
    <div
      className="absolute pointer-events-none"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: '260px',
        height: '260px',
        background:
          'radial-gradient(circle, rgba(108,99,255,0.35), rgba(139,92,246,0.15) 50%, transparent 75%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(35px)',
        mixBlendMode: 'screen',
      }}
    />
    <div
      className="absolute pointer-events-none"
      style={{
        left: mousePosition.x + 20,
        top: mousePosition.y - 10,
        width: '220px',
        height: '240px',
        background:
          'radial-gradient(ellipse, rgba(139,92,246,0.25), transparent 70%)',
        transform: 'translate(-50%, -50%) rotate(25deg)',
        filter: 'blur(45px)',
        mixBlendMode: 'screen',
      }}
    />
  </>
)}

          {/* Gradient overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(108, 99, 255, 0.1), transparent 70%)"
            }}
          />

          {/* Animated top accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute top-0 left-0 right-0 h-[2px] origin-left"
            style={{
              background: "linear-gradient(to right, transparent, var(--color-accent), transparent)"
            }}
          />

          {/* Floating sparkle icon */}
          <motion.div
            animate={shouldReduceMotion ? {} :{
              y: [0, -10, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 right-8 md:top-12 md:right-12"
          >
            <Sparkles
              className="w-8 h-8 md:w-12 md:h-12 opacity-30"
              style={{ color: "var(--color-accent)" }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 text-center space-y-6">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(108, 99, 255, 0.1)",
                border: "1px solid rgba(108, 99, 255, 0.3)",
                color: "var(--color-accent)"
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--color-accent)" }}></span>
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--color-accent)" }}></span>
              </span>
              Join 10,000+ Active Users
            </motion.div>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "var(--color-text)" }}
            >
              Ready to Experience{" "}
              <span
                className="relative inline-block"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500">
                  the Future?
                </span>
                {/* Underline effect */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-1 left-0 right-0 h-[3px] origin-left rounded-full"
                  style={{ background: "var(--color-accent)", opacity: 0.5 }}
                />
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--color-text)", opacity: 0.8 }}
            >
              Join thousands of users and transform the way you connect, chat, and play.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              {/* Primary CTA */}
              <motion.a
                href="/Login"
                className="group relative px-8 py-4 rounded-full font-semibold text-base md:text-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(108, 99, 255, 0.9), rgba(99, 102, 241, 0.9))",
                  color: "#ffffff",
                  boxShadow: "0 8px 32px rgba(108, 99, 255, 0.3)"
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 48px rgba(108, 99, 255, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </span>

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0"
                  animate={shouldReduceMotion ? {} :{
                    background: [
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                      "linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.1) 150%, transparent 200%)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>

              {/* Secondary CTA */}
              <motion.button
                className="px-8 py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text)",
                  backdropFilter: "blur(10px)"
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "var(--color-accent)",
                  boxShadow: "0 0 30px rgba(108, 99, 255, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm"
              style={{ color: "var(--color-text)", opacity: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>2-minute setup</span>
              </div>
            </motion.div>

          </div>

          {/* Bottom shine effect */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(to right, transparent, var(--color-accent), transparent)",
              opacity: 0.3
            }}
          />

          {/* Corner accents */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            style={{ background: "var(--color-accent)", opacity: 0.15 }}
          />

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
            style={{ background: "var(--color-accent)", opacity: 0.15 }}
          />
        </motion.div>

      </div>
    </section>
  );
}
