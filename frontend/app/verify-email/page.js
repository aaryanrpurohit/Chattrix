"use client";

import React, { useState, useEffect } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleResendEmail = async () => {
    if (!isLoaded || !signUp) return;
    setIsSending(true);
    setMessage("");

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setMessage("Verification code sent! Please check your inbox.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to send verification code.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!isLoaded || !signUp) return;
    setIsVerifying(true);
    setMessage("");

    try {
      await signUp.attemptEmailAddressVerification({ code });
      setMessage("Email verified successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("Invalid code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
    >


      <div
        className="max-w-md w-full p-6 rounded-lg shadow-lg text-center"
        style={{ backgroundColor: "var(--color-surface)", border: `1px solid var(--color-border)` }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
          Verify Your Email
        </h1>

        <p className="mb-6 text-sm sm:text-base" style={{ color: "var(--color-text)" }}>
          Enter the verification code we sent to your email.
        </p>

        {message && (
          <p className="mb-4 text-sm sm:text-base" style={{ color: "var(--color-accent)" }}>
            {message}
          </p>
        )}

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          className="w-full mb-4 p-3 rounded border focus:outline-none"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)" }}
        />

        <button
          onClick={handleVerifyCode}
          disabled={isVerifying || !isLoaded}
          className="w-full py-3 px-4 mb-4 rounded font-semibold transition flex justify-center items-center gap-2"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-text)",
            opacity: isVerifying ? 0.5 : 1,
            cursor: isVerifying ? "not-allowed" : "pointer",
          }}
        >
          {isVerifying ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </button>

        <button
          onClick={handleResendEmail}
          disabled={isSending || !isLoaded}
          className="w-full py-3 px-4 mb-2 rounded font-semibold transition"
          style={{
            backgroundColor: "transparent",
            border: `1px solid var(--color-border)`,
            color: "var(--color-text)",
            opacity: isSending ? 0.5 : 1,
            cursor: isSending ? "not-allowed" : "pointer",
          }}
        >
          {isSending ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Resending...
            </>
          ) : (
            "Resend Code"
          )}
        </button>

        <button
          onClick={() => router.push("/sign-up")}
          className="w-full py-3 px-4 rounded font-semibold transition"
          style={{
            backgroundColor: "transparent",
            border: `1px solid var(--color-border)`,
            color: "var(--color-text)",
          }}
        >
          Back to Signup
        </button>
      </div>
    </div>
  );
}
