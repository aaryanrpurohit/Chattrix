"use client";

import React, { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import BackArrow from '../../components/Backarrow';


export default function CustomSignUpPage() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, setActive, isLoaded } = useSignUp();

  const router = useRouter();

 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "light");
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.push("/home");
      } else if (result.status === "missing_requirements") {
        router.push("/verify-email");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/home",
      redirectUrlComplete: "/home",
    });
  };

  const handleGitHubSignIn = async () => {
    if (!isLoaded) return;
    await signUp.authenticateWithRedirect({
      strategy: "oauth_github",
      redirectUrl: "/home",
      redirectUrlComplete: "/home",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-4"
      style={{
        backgroundColor: isDark ? "#000" : "#f3f4f6",
        color: isDark ? "#fff" : "#000",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >

      {/* 🌙 Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
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
        <BackArrow to='/sign-in' />
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

      {/* 🧩 Centered Sign Up Form */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl"
        style={{
          backgroundColor: isDark ? "#111" : "#fff",
          transition: "background-color 0.4s ease",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4 relative">
            <Mail
              size={20}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "0.9rem",
                color: isDark ? "#aaa" : "#555",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3 pl-10 rounded-md outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a1a" : "#f9fafb",
                border: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
                color: isDark ? "#fff" : "#000",
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4 relative">
            <Lock
              size={20}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "0.9rem",
                color: isDark ? "#aaa" : "#555",
              }}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3 pl-10 pr-10 rounded-md outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a1a" : "#f9fafb",
                border: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
                color: isDark ? "#fff" : "#000",
              }}
            />
            <div
              className="absolute right-3 top-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={isDark ? "#fff" : "#000"} />
              ) : (
                <Eye size={20} color={isDark ? "#fff" : "#000"} />
              )}

            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4 relative">
            <Lock
              size={20}
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "0.9rem",
                color: isDark ? "#aaa" : "#555",
              }}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full p-3 pl-10 pr-10 rounded-md outline-none"
              style={{
                backgroundColor: isDark ? "#1a1a1a" : "#f9fafb",
                border: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
                color: isDark ? "#fff" : "#000",
              }}
            />
            <div
              className="absolute right-3 top-4 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={isDark ? "#fff" : "#000"} />
              ) : (
                <Eye size={20} color={isDark ? "#fff" : "#000"} />
              )}

            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-red-500 text-sm mb-4 text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
          <div id="clerk-captcha" />
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className=" bg-[var(--color-accent)] w-full p-3 rounded-md font-semibold text-white transition-all"
            style={{
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-[var(--color-accent)] hover:underline"
          >
            Sign in
          </a>
        </p>


        {/* Divider */}
        <div className="flex items-center my-6">
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: isDark ? "#333" : "#ddd",
            }}
          />
          <span style={{ margin: "0 1rem", color: isDark ? "#aaa" : "#555" }}>
            or
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: isDark ? "#333" : "#ddd",
            }}
          />
        </div>

        {/* OAuth */}
        <div className="grid gap-3">
          {/* Google Button */}
          <motion.button
            whileHover={{ scale: isLoaded ? 1.02 : 1 }}
            whileTap={{ scale: isLoaded ? 0.98 : 1 }}
            onClick={handleGoogleSignIn}
            disabled={!isLoaded}
            className="flex items-center justify-center gap-3 w-full p-3 rounded-md border text-sm font-medium"
            style={{
              backgroundColor: isDark ? "#1a1a1a" : "#fff",
              border: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
              color: isDark ? "#fff" : "#374151",
              opacity: !isLoaded ? 0.6 : 1,
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign in with Google
          </motion.button>

          {/* GitHub Button */}
          <motion.button
            whileHover={{ scale: isLoaded ? 1.02 : 1 }}
            whileTap={{ scale: isLoaded ? 0.98 : 1 }}
            onClick={handleGitHubSignIn}
            disabled={!isLoaded}
            className="flex items-center justify-center gap-3 w-full p-3 rounded-md border text-sm font-medium"
            style={{
              backgroundColor: isDark ? "#1a1a1a" : "#fff",
              border: `1px solid ${isDark ? "#2d2d2d" : "#e5e7eb"}`,
              color: isDark ? "#fff" : "#181717",
              opacity: !isLoaded ? 0.6 : 1,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.77-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Sign in with GitHub
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
