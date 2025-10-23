"use client";
import React, { useState, useEffect } from 'react';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { User, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
const LeftSection = dynamic(() => import('../sign-in/LeftSection'), { ssr: false });
import BackArrow from '../../components/Backarrow';

export default function CustomLoginPage() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [isDark, setIsDark] = useState(false);


    // On mount, safely access document
    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            setIsDark(currentTheme === "dark");
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR safety
        const root = document.documentElement;
        if (isDark) {
            root.setAttribute("data-theme", "dark");
            root.classList.add("dark");
            root.classList.remove("light");
        } else {
            root.setAttribute("data-theme", "light");
            root.classList.add("light");
            root.classList.remove("dark");
        }
    }, [isDark]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            setIsDark(currentTheme === "dark");
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId });
                router.push('/dashboard');
            } else {
                setError('Sign in failed. Please try again.');
            }
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/dashboard',
                redirectUrlComplete: '/dashboard',
            });
        } catch (err) {
            setError(err.errors?.[0]?.message || 'Google sign in failed');
        }
    };

    const handleGitHubSignIn = async () => {
        if (!isLoaded) return;

        try {
            await signIn.authenticateWithRedirect({
                strategy: 'oauth_github',
                redirectUrl: '/dashboard',
                redirectUrlComplete: '/dashboard',
            });
        } catch (err) {
            setError(err.errors?.[0]?.message || 'GitHub sign in failed');
        }
    };

    return (
        <div className="min-h-screen flex" style={{ backgroundColor: isDark ? '#000000' : '#f3f4f6' }}>
            <BackArrow/>
            {/* Left Section - hidden on mobile */}
    <div className="hidden lg:flex w-1/2">
        <LeftSection />
    </div>
            {/* Right Side - Custom Login Form */}
            <div
                className="w-full lg:w-1/2 flex items-center justify-center p-8 relative"
                style={{ backgroundColor: isDark ? '#000000' : '#ffffff' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-8 right-8"
                >
                    <div className="z-50">
                        <button
                            className="theme-button shadow-xl backdrop-blur-md bg-opacity-30 transition-all duration-300 ease-in-out"
                            onClick={() => setIsDark(!isDark)}
                            aria-label="Toggle theme"
                        >
                            {/* Sun Icon - Visible when Dark Theme is ACTIVE (isDark) */}
                            <svg
                                className={`icon sun-icon ${isDark ? 'active' : ''}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle cx="12" cy="12" r="5" fill="currentColor" />
                                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                            {/* Moon Icon - Visible when Light Theme is ACTIVE (!isDark) */}
                            <svg
                                className={`icon moon-icon ${!isDark ? 'active' : ''}`}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                            </svg>
                        </button>

                        <style jsx="true">{`
            .theme-button {
            position: relative;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            }

            .theme-button:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .theme-button:active {
            transform: scale(0.95);
            }

            .icon {
            position: absolute;
            width: 24px;
            height: 24px;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            /* Moon Icon (Light Mode Button) */
            .moon-icon {
            color: #c4b5fd;
            transform: rotate(180deg) scale(0);
            opacity: 0;
            }

            .moon-icon.active {
            transform: rotate(0deg) scale(1);
            opacity: 1;
            }

            /* Sun Icon (Dark Mode Button) */
            .sun-icon {
            color: #fcd34d;
            transform: rotate(-180deg) scale(0);
            opacity: 0;
            }

            .sun-icon.active {
            transform: rotate(0deg) scale(1);
            opacity: 1;
            }

            /* Theme application styles */
            :global(html) {
                transition: background-color 0.5s ease;
            }
            :global(html[data-theme="dark"]) {
                background-color: #1f2937;
                color: #f3f4f6;
            }
            :global(html[data-theme="light"]) {
                background-color: #f3f4f6;
                color: #1f2937;
            }
        `}</style>

                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md px-4"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-4xl font-extrabold mb-2"
                            style={{
                                color: isDark ? '#ffffff' : '#000000',
                                letterSpacing: '-0.025em'
                            }}
                        >
                            Welcome Back
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            style={{ color: '#6b7280', fontSize: '0.95rem' }}
                        >
                            Don't have an account?{' '}
                            <a
                                href="/sign-up"
                                style={{ color: '#7c3aed', fontWeight: 500, textDecoration: 'none' }}
                                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                            >
                                Sign Up
                            </a>
                        </motion.p>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    padding: '0.75rem 1rem',
                                    backgroundColor: '#fee2e2',
                                    border: '1px solid #fecaca',
                                    borderRadius: '0.5rem',
                                    marginBottom: '1rem',
                                    color: '#991b1b',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Email/Username Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mb-4"
                        >
                            <label
                                htmlFor="email"
                                style={{
                                    display: 'block',
                                    color: isDark ? '#ffffff' : '#000000',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                Username or Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af'
                                    }}
                                />
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Username or Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 3rem',
                                        backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                                        border: `1px solid ${isDark ? '#2d2d2d' : '#e5e7eb'}`,
                                        borderRadius: '0.5rem',
                                        fontSize: '0.95rem',
                                        color: isDark ? '#ffffff' : '#6b7280',
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                        opacity: isLoading ? 0.6 : 1
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                                        e.target.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.2)'}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = isDark ? '#2d2d2d' : '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mb-2"
                        >
                            <label
                                htmlFor="password"
                                style={{
                                    display: 'block',
                                    color: isDark ? '#ffffff' : '#000000',
                                    fontWeight: 600,
                                    fontSize: '0.95rem',
                                    marginBottom: '0.5rem'
                                }}
                            >
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    size={20}
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#9ca3af'
                                    }}
                                />
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem 0.875rem 3rem',
                                        backgroundColor: isDark ? '#1a1a1a' : '#f9fafb',
                                        border: `1px solid ${isDark ? '#2d2d2d' : '#e5e7eb'}`,
                                        borderRadius: '0.5rem',
                                        fontSize: '0.95rem',
                                        color: isDark ? '#ffffff' : '#6b7280',
                                        outline: 'none',
                                        transition: 'all 0.2s',
                                        opacity: isLoading ? 0.6 : 1
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = isDark ? '#4b5563' : '#d1d5db';
                                        e.target.style.boxShadow = `0 0 0 3px ${isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(209, 213, 219, 0.2)'}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = isDark ? '#2d2d2d' : '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </motion.div>


                        {/* Login Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                            type="submit"
                            disabled={isLoading || !isLoaded}
                            style={{
                                width: '100%',
                                padding: '0.875rem 1.5rem',
                                backgroundColor: '#7c3aed',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                opacity: isLoading ? 0.7 : 1,
                                marginTop: '20px'
                            }}
                        >
                            {isLoading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Loader2 size={20} />
                                    </motion.div>
                                    Signing in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </motion.button>
                    </form>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '2rem 0'
                        }}
                    >
                        <div style={{
                            flex: 1,
                            height: '1px',
                            backgroundColor: isDark ? '#2d2d2d' : '#e5e7eb'
                        }}></div>
                        <span style={{
                            padding: '0 1rem',
                            color: '#9ca3af',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            textTransform: 'uppercase'
                        }}>
                            OR
                        </span>
                        <div style={{
                            flex: 1,
                            height: '1px',
                            backgroundColor: isDark ? '#2d2d2d' : '#e5e7eb'
                        }}></div>
                    </motion.div>

                    {/* Social Login Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                    >
                        {/* Google Sign In */}
                        <motion.button
                            whileHover={{ scale: isLoaded ? 1.02 : 1, y: isLoaded ? -2 : 0 }}
                            whileTap={{ scale: isLoaded ? 0.98 : 1 }}
                            onClick={handleGoogleSignIn}
                            disabled={!isLoaded}
                            style={{
                                padding: '0.875rem 1rem',
                                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                                border: `1px solid ${isDark ? '#2d2d2d' : '#e5e7eb'}`,
                                borderRadius: '0.5rem',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                color: isDark ? '#ffffff' : '#374151',
                                cursor: !isLoaded ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                opacity: !isLoaded ? 0.6 : 1
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Sign in with Google
                        </motion.button>

                        {/* GitHub Sign In */}
                        <motion.button
                            whileHover={{ scale: isLoaded ? 1.02 : 1, y: isLoaded ? -2 : 0 }}
                            whileTap={{ scale: isLoaded ? 0.98 : 1 }}
                            onClick={handleGitHubSignIn}
                            disabled={!isLoaded}
                            style={{
                                padding: '0.875rem 1rem',
                                backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
                                border: `1px solid ${isDark ? '#2d2d2d' : '#e5e7eb'}`,
                                borderRadius: '0.5rem',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                color: isDark ? '#ffffff' : '#374151',
                                cursor: !isLoaded ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                opacity: !isLoaded ? 0.6 : 1
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill={isDark ? '#ffffff' : '#181717'}>
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Sign in with GitHub
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
