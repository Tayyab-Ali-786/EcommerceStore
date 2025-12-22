"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
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
    <div className="mx-auto w-full max-w-md rounded-none border border-zinc-800 bg-white p-4 shadow-input md:rounded-2xl md:p-8 dark:bg-zinc-950">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
        Welcome to My Store
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        Create an account to get started with your shopping
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {message && (
          <div className="mb-4 rounded-md bg-green-900/30 border border-green-800 px-3 py-2 text-sm text-green-400">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-900/30 border border-red-800 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="dark:text-zinc-300">
              First name
            </Label>
            <Input
              id="firstname"
              placeholder="Tyler"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-blue-600"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname" className="dark:text-zinc-300">
              Last name
            </Label>
            <Input
              id="lastname"
              placeholder="Durden"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-blue-600"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email" className="dark:text-zinc-300">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-blue-600"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password" className="dark:text-zinc-300">
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-blue-600"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword" className="dark:text-zinc-300">
            Phone (optional)
          </Label>
          <Input
            id="twitterpassword"
            placeholder="+1 555 555 5555"
            type="text"
            value={twitterPassword}
            onChange={(e) => setTwitterPassword(e.target.value)}
            className="dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-blue-600"
          />
        </LabelInputContainer>

        {/* --- UPDATED BUTTON TO MATCH NAVBAR COLORS --- */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign up →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:text-white dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => console.log("GitHub flow placeholder")}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:text-white dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => console.log("Google flow placeholder")}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:text-white dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => console.log("OnlyFans flow placeholder")}
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              OnlyFans
            </span>
            <BottomGradient />
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
