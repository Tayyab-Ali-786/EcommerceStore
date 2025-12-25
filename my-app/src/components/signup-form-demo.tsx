"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twitterPassword, setTwitterPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // basic client validation
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
      password,
      phone: twitterPassword ? String(twitterPassword).trim() : undefined,
      isAdmin: false,
    };

    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommercestore-backend-4p55.onrender.com/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        const msg =
          (result && result.message) ||
          `Server responded with status ${res.status}`;
        throw new Error(msg);
      }

      if (result && result.success) {
        setMessage(result.message || "Account created successfully.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTwitterPassword("");
      } else {
        setError(result.message || "Signup failed.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-zinc-950 p-6 md:p-8">
      <h2 className="text-xl font-bold text-white">
        Welcome Back
      </h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-400">
        Enter your details to create your exclusive showroom account.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {message && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400"
          >
            {message}
          </motion.div>
        )}
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}

        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 h-11 border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all rounded-xl"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 h-11 border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all rounded-xl"
            />
          </LabelInputContainer>
        </div>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="hello@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-11 border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all rounded-xl"
          />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-11 border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all rounded-xl"
          />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-8">
          <Label htmlFor="phone" className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
            Phone (optional)
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 000-0000"
            type="text"
            value={twitterPassword}
            onChange={(e) => setTwitterPassword(e.target.value)}
            className="mt-1 h-11 border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600/50 transition-all rounded-xl"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative h-12 w-full overflow-hidden rounded-xl bg-white font-semibold text-zinc-950 transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Initializing..." : "Create Account"}
          <BottomGradient />
        </button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            className="flex h-11 items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-white transition-all hover:bg-zinc-800"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4" />
            <span>GitHub</span>
          </button>
          <button
            className="flex h-11 items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium text-white transition-all hover:bg-zinc-800"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4" />
            <span>Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
