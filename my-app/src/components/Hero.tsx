import React from "react";

export default function Hero() {
  return (
    <div className="relative h-[80vh] w-full bg-gray-900 flex items-center justify-center text-center px-4">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Winter Collection ’25
        </h1>
        <p className="text-lg md:text-xl text-gray-200">
          Discover the warmth of style. Premium wools, modern cuts, and timeless
          elegance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-100 transition">
            Shop Men
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white/10 transition">
            Shop Women
          </button>
        </div>
      </div>
    </div>
  );
}
