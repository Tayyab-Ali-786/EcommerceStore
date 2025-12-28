"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://ecommercestore-backend-4p55.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Store user and token
      localStorage.setItem("token", result.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      // Redirect based on role
      if (result.data.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 md:flex-row">
      {/* Left Side - Visual Art */}
      <div className="relative hidden w-full overflow-hidden md:flex md:w-1/2 lg:w-3/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        <Image
          src="/signup-visual.png"
          alt="Login Visual"
          fill
          className="object-cover opacity-60"
          priority
        />

        <div className="relative z-20 flex h-full w-full flex-col items-start justify-end p-16 lg:p-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              Welcome Back
            </span>
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white lg:text-8xl">
              Rediscover <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Your Style
              </span>
            </h1>
            <p className="max-w-md text-xl leading-relaxed text-zinc-400">
              Sign in to access personalized recommendations, order history, and
              exclusive drops curated for you.
            </p>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 z-30 h-12 w-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl"
        >
          <div className="h-6 w-6 rounded-full bg-blue-500/50 blur-sm" />
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="relative flex w-full items-center justify-center bg-zinc-950 p-6 md:w-1/2 lg:w-2/5">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-blue-600/5 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Sign in to your account
            </h2>
            <p className="mt-3 text-zinc-400">
              New here?{" "}
              <a
                href="/signup"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/signup");
                }}
              >
                Create an account
              </a>
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1 backdrop-blur-sm">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-zinc-900 p-8"
            >
              <div className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
                    {error}
                  </div>
                )}
                
                <label className="block">
                  <span className="text-sm font-medium text-zinc-300">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg bg-zinc-800/60 px-3 py-2 text-white placeholder-zinc-500 outline-none ring-1 ring-zinc-800 focus:ring-blue-400"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-zinc-300">
                    Password
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-lg bg-zinc-800/60 px-3 py-2 text-white placeholder-zinc-500 outline-none ring-1 ring-zinc-800 focus:ring-blue-400"
                    placeholder="Enter your password"
                  />
                </label>

                <div className="flex items-center justify-between text-sm text-zinc-400">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-blue-400"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-blue-400 hover:text-blue-300">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-white font-semibold shadow-md hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : "Sign in"}
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-zinc-900 px-3 text-zinc-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M21 12.3c0-.64-.06-1.25-.18-1.84H12v3.48h5.54c-.24 1.28-.95 2.37-2.03 3.1v2.58h3.28c1.92-1.77 3.04-4.37 3.04-7.32z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 22c2.7 0 4.97-.9 6.63-2.45l-3.28-2.58c-.91.62-2.07.99-3.35.99-2.58 0-4.77-1.74-5.56-4.08H3.07v2.57C4.73 19.98 8.08 22 12 22z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.44 13.88A6.01 6.01 0 0 1 6 12c0-.63.1-1.25.28-1.82V7.61H3.07A10 10 0 0 0 2 12c0 1.6.38 3.12 1.07 4.44l3.37-2.56z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 6.5c1.47 0 2.8.5 3.84 1.47l2.88-2.88C16.96 3.5 14.7 2.5 12 2.5 8.08 2.5 4.73 4.52 3.07 7.61l3.37 2.57C7.23 8.24 9.42 6.5 12 6.5z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
