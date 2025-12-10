import React from "react";

export default function MiniPromo() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1 */}
        <div className="relative h-80 rounded-2xl overflow-hidden flex items-center pl-10 bg-gray-100 group">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
            alt="Women's Collection"
            className="absolute right-0 top-0 w-2/3 h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          <div className="relative z-10 max-w-[50%]">
            <span className="text-sm font-semibold text-indigo-600 uppercase mb-2 block">
              New Season
            </span>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Womens Exclusive
            </h3>
            <a href="#" className="underline font-medium hover:text-indigo-600">
              Explore Collection
            </a>
          </div>
        </div>

        {/* Banner 2 */}
        <div className="relative h-80 rounded-2xl overflow-hidden flex items-center pl-10 bg-gray-100 group">
          <img
            src="https://images.unsplash.com/photo-1488161628813-99c974fc5b76?auto=format&fit=crop&q=80&w=800"
            alt="Men's Collection"
            className="absolute right-0 top-0 w-2/3 h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
          />
          <div className="relative z-10 max-w-[50%]">
            <span className="text-sm font-semibold text-indigo-600 uppercase mb-2 block">
              Just In
            </span>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Men's Casual Wear
            </h3>
            <a href="#" className="underline font-medium hover:text-indigo-600">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
