'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, MessageSquare, Gamepad2, Phone } from 'lucide-react';
import ToggleTheme from './toggletheme2';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

export default function ChattrixSidebar() {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const { user } = useUser();
    const router = useRouter();

    const menuItems = [
        { name: 'Home', icon: Home, path: '/dashboard' },
        { name: 'Friends', icon: Users, path: '/friends' },
        { name: 'Chat Groups', icon: MessageSquare, path: '/group-chat' },
        { name: 'Games', icon: Gamepad2, path: '/games' },
        { name: 'Calls', icon: Phone, path: '/calls' },
    ];

    const sidebarVariants = {
        collapsed: { width: '5rem' },
        expanded: { width: '16rem' },
    };

    const iconVariants = {
        inactive: { scale: 1 },
        active: { scale: 1.1, filter: 'drop-shadow(0 0 8px var(--color-accent))' },
        hover: { scale: 1.15 },
    };

    const activeIndicatorVariants = {
        hidden: { scaleY: 0, opacity: 0 },
        visible: { scaleY: 1, opacity: 1, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial="collapsed"
            animate={isHovered ? 'expanded' : 'collapsed'}
            variants={sidebarVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-screen bg-[var(--color-surface)] flex flex-col shadow-2xl shadow-[var(--color-accent)]/20 overflow-hidden "
        >
            {/* Top Section */}
            <div className="flex items-center gap-3 p-6 border-b border-[var(--color-border)]">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/50 flex-shrink-0"
                >
                    <Image src="/assets/images/logo.png" width={50} height={50} alt="Logo" />
                </motion.div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="text-[var(--color-text)] font-bold text-xl whitespace-nowrap"
                        >
                            Chattrix
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <motion.button
                            key={item.name}
                            onClick={() => router.push(item.path)}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`cursor-pointer w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative ${isActive
                                ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]'
                                : 'text-gray-400 hover:bg-[var(--color-border)] hover:text-[var(--color-text)]'
                                }`}
                        >
                            {/* Active Indicator */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        variants={activeIndicatorVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="absolute left-0 w-1 h-8 bg-[var(--color-accent)] rounded-r-full shadow-[0_0_10px_var(--color-accent)]"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Icon */}
                            <motion.div
                                variants={iconVariants}
                                initial="inactive"
                                animate={isActive ? 'active' : 'inactive'}
                                whileHover="hover"
                                transition={{ duration: 0.2 }}
                            >
                                <Icon className="w-6 h-6 flex-shrink-0" />
                            </motion.div>

                            {/* Label */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2, delay: 0.05 }}
                                        className="font-medium whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 space-y-2 border-t border-[var(--color-border)]">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-1.5 py-3 rounded-xl text-gray-400 hover:bg-[var(--color-border)] hover:text-[var(--color-text)] transition-colors duration-300"
                >
                    <ToggleTheme />
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-sm font-medium"
                            >
                                Change Theme
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors duration-300 hover:bg-[var(--color-border)]"
                >
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-14 h-14",
                                userButtonAvatarImage: "w-14 h-14",
                            },
                        }}
                    />
                    <AnimatePresence>
                        {isHovered && user && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="text-left"
                            >
                                <p className="font-medium text-[var(--color-text)] text-sm">{user.fullName}</p>
                                <p className="text-xs text-gray-500">@{user.username}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
