"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-4 text-center">

      {/* Animated Icon */}
      <motion.div
        className="mb-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        whileHover={{ scale: 1.1 }}
      >
        <AlertCircle className="w-24 h-24 text-[var(--color-accent)]" />
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops!
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        className="text-lg md:text-2xl mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        This section is under construction.
      </motion.p>

      <motion.p
        className="text-gray-400 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        We are working hard to bring this feature soon. Please check back later!
      </motion.p>

      {/* Animated Button */}
      <motion.a
        href="/"
        className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-lg font-semibold hover:brightness-110 transition"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        Go Back Home
      </motion.a>
    </div>
  );
};

export default NotFoundPage;
