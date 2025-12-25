"use client";

import React from "react";
import SignupFormDemo from "@/components/signup-form-demo";
import Image from "next/image";
import { motion } from "motion/react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 md:flex-row">
      {/* Left Side - Visual Art */}
      <div className="relative hidden w-full overflow-hidden md:flex md:w-1/2 lg:w-3/5">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        <Image
          src="/signup-visual.png"
          alt="Signup Visual"
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
              Exclusive Access
            </span>
            <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-white lg:text-8xl">
              Style Meets <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
            <p className="max-w-md text-xl leading-relaxed text-zinc-400">
              Join the elite circle of shoppers who demand more from their fashion experience. Curated styles, early access, and personalized fits await.
            </p>

            <div className="mt-12 flex items-center space-x-6">
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center overflow-hidden">
                       <Image src={`https://i.pravatar.cc/150?u=${i}`} alt="user" width={40} height={40} />
                    </div>
                  ))}
               </div>
               <p className="text-sm text-zinc-500">
                  Joined by <span className="font-semibold text-white">10k+</span> members this month
               </p>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 z-30 h-12 w-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl"
        >
           <div className="h-6 w-6 rounded-full bg-blue-500/50 blur-sm" />
        </motion.div>
      </div>

      {/* Right Side - Signup Form */}
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
              Create an account
            </h2>
            <p className="mt-3 text-zinc-400">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </a>
            </p>
          </div>
          
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1 backdrop-blur-sm">
             <SignupFormDemo />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
