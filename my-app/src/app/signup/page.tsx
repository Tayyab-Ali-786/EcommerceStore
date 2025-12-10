"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  isAdmin: boolean;
}

export default function SignUpForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      isAdmin: false,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setServerMessage(null);
    setServerError(null);

    try {
      const res = await fetch("http://localhost:3000/addUser", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone || undefined,
          isAdmin: !!data.isAdmin,
        }),
      });

      const result = await res.json().catch(() => ({} as any));

      if (!res.ok) {
        const msg = result && result.message ? result.message : `Request failed with status ${res.status}`;
        throw new Error(msg);
      }

      if (result && result.success) {
        setServerMessage(result.message || "Account created successfully.");
      } else {
        const msg = result && result.message ? result.message : "Signup failed";
        setServerError(msg);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setServerError(message);
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-600 mt-2">Join us and get started today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 space-y-6">
            {serverMessage && (
              <div className="p-3 bg-green-50 text-green-700 rounded">{serverMessage}</div>
            )}
            {serverError && <div className="p-3 bg-red-50 text-red-700 rounded">{serverError}</div>}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required", maxLength: { value: 50, message: "Max 50 characters" } })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:ring-offset-1 focus:border-transparent outline-none transition-all`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i, message: "Please enter a valid email" },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:ring-offset-1 focus:border-transparent outline-none transition-all`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone (optional)
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", { maxLength: { value: 20, message: "Max 20 characters" } })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="+1 555 555 5555"
              />
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:ring-offset-1 focus:border-transparent outline-none transition-all`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center">
              <input id="isAdmin" type="checkbox" {...register("isAdmin")} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
              <label htmlFor="isAdmin" className="ml-3 text-sm text-gray-700 font-medium">Register as Administrator</label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-lg font-medium text-white transition-all ${
                isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By creating an account, you agree to our{" "}
          <a href="#" className="underline hover:text-gray-700">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
