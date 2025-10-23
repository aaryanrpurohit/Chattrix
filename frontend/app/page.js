"use client";


import { motion } from "framer-motion";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from '@clerk/nextjs'
import { MessageCircle, Shield, Zap, Users, Gift, Globe } from 'lucide-react';
import ThemeToggle from '../components/toggletheme2';
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


const Hero = dynamic(() => import('../components/hero'), { ssr: false });

import Howitworks from "../components/howitworks"
const Community = dynamic(() => import('../components/community'), { ssr: false });
import Footer from "../components/footer"


export default function Home() {
  const [scrolled, setScrolled] = useState(false);
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
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);


  if (!isLoaded || isSignedIn) return null;
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
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-2xl px-6 py-3 transition-all duration-300 ${scrolled ? "shadow-xl" : "shadow-lg"
              }`}
            style={{
              background: scrolled
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo Section */}
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{
                    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <Image src="/assets/images/logo.png" width={40} height={40} alt="C" />
                </div>
                <span
                  className="font-bold text-xl hidden sm:inline bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"
                >
                  Chattrix
                </span>
              </motion.div>
              {/* Right Side - Theme Toggle and Join Button */}
              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Sign In / Join Now Button */}
                <SignedOut>
                  <SignInButton mode="redirect">
                    {/* Clerk automatically handles redirecting; this button is only the visual wrapper */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="relative px-8 py-3 rounded-full font-semibold text-base overflow-hidden group"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(108, 99, 255, 0.9), rgba(99, 102, 241, 0.9))",
                        color: "#ffffff",
                        boxShadow: "0 4px 20px rgba(108, 99, 255, 0.3)",
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 6px 30px rgba(108, 99, 255, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Join Now

                      <motion.div
                        className="absolute inset-0 -translate-x-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        }}
                        animate={{
                          translateX: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1,
                        }}
                      />
                    </motion.button>
                  </SignInButton>
                </SignedOut>


                {/* When signed in, show user menu */}
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>

            </div>
          </div>
        </div>
      </motion.nav>
      <main>
        <section>
          <Hero />
        </section>
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

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
              variants={containerFadeIn}    // ✅ container
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
        <section>
          <Howitworks />
        </section>
        <section>
          <Community />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </>
  );
}
