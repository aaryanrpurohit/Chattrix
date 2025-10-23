"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
    {
        name: "Twitter",
        icon: Twitter,
        url: "https://x.com/aaryanrpurohit",
        label: "Twitter Profile"
    },
    {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/aaryanrpurohit",
        label: "GitHub Profile"
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://www.linkedin.com/in/aaryan-rajpurohit-872b6b370/",
        label: "LinkedIn Profile"
    }
];

const iconVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function Footer() {
    return (
        <footer
            className="relative w-full backdrop-blur-lg border-t overflow-hidden"
            style={{
                background: "rgba(255, 255, 255, 0.02)",
                borderColor: "var(--color-border)"
            }}
        >
            {/* Subtle gradient overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "linear-gradient(to right, rgba(108, 99, 255, 0.03), transparent, rgba(108, 99, 255, 0.03))",
                    opacity: 0.5
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative max-w-7xl mx-auto px-6 sm:px-10 py-6 md:py-8"
            >
                {/* Main Content Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Brand Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-2"
                    >
                        <img
                            src="/assets/images/logo.png"
                            alt="Chattrix Logo"
                            className="h-11 w-11 object-contain"
                        />
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500">
                            Chattrix
                        </span>
                    </motion.div>

                    {/* Attribution */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center text-sm md:text-base"
                    style={{
                        color: "var(--color-text)",
                        opacity: 0.7
                    }}
                >
                    Made with{" "}
                    <motion.span
                        className="inline-block"
                        animate={{
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    >
                        ❤️
                    </motion.span>
                    {" "}by{" "}
                    <span
                        className="font-semibold"
                        style={{ color: "var(--color-accent)" }}
                    >
                        Aaryan Rajpurohit
                    </span>
                </motion.div>


                    {/* Social Icons */}
                    <motion.div
                        className="flex gap-6"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.3
                                }
                            }
                        }}
                    >
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                variants={iconVariants}
                                className="transition-colors duration-300"
                                style={{ color: "var(--color-text)" }}
                                whileHover={{
                                    scale: 1.2,
                                    color: "var(--color-accent)",
                                    filter: "drop-shadow(0 0 8px var(--color-accent))"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>



            </motion.div>

            {/* Bottom glow effect */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                style={{
                    background: "linear-gradient(to right, transparent, var(--color-accent), transparent)",
                    opacity: 0.3
                }}
            />
        </footer>
    );
}
