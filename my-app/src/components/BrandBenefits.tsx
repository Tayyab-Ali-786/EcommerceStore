import React from "react";
import { Truck, ShieldCheck, RefreshCw, Star } from "lucide-react";

const benefits = [
  {
    icon: <Star size={32} />,
    title: "Premium Quality",
    desc: "Crafted with the finest materials.",
  },
  {
    icon: <Truck size={32} />,
    title: "Fast Delivery",
    desc: "Free shipping on orders over $100.",
  },
  {
    icon: <RefreshCw size={32} />,
    title: "Easy Returns",
    desc: "Hassle-free 30-day return policy.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Payment",
    desc: "100% secure checkout process.",
  },
];

export default function BrandBenefits() {
  return (
    <section className="bg-white py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {benefits.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-3 p-4">
            <div className="text-indigo-600 p-3 bg-indigo-50 rounded-full mb-2">
              {item.icon}
            </div>
            <h4 className="font-bold text-lg text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
