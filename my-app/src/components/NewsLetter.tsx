import React from "react";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Mail className="mx-auto mb-4 text-indigo-400" size={48} />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Our Style Club
        </h2>
        <p className="text-gray-300 mb-8 max-w-lg mx-auto">
          Subscribe to our newsletter and get an exclusive{" "}
          <span className="text-white font-bold">10% OFF</span> your first
          order, plus early access to new drops.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
          />
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-md transition text-white">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
