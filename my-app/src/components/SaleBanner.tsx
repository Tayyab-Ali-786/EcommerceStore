import React from "react";

export default function SaleBanner() {
  return (
    <div className="bg-indigo-600 text-white py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-wide">
          Flat 30% OFF – Winter Sale!
        </h2>
        <p className="text-indigo-100 text-lg">
          Use code{" "}
          <span className="font-bold bg-white text-indigo-600 px-2 py-0.5 rounded">
            WINTER30
          </span>{" "}
          at checkout. Limited time only.
        </p>
        <button className="mt-4 bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
}
