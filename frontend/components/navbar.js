"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import ThemeToggle from '../components/toggletheme2';
import Image from 'next/image'

export default function GlassmorphicNavbar() {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for better glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
  );
}
