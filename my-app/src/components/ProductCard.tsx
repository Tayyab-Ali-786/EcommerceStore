import React from "react";
import { ShoppingCart } from "lucide-react";

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({
  name,
  price,
  image,
  category,
}: ProductProps) {
  return (
    <div className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 hover:text-white">
          <ShoppingCart size={20} />
        </button>
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs text-gray-500 uppercase">{category}</span>
        <h3 className="text-md font-medium text-gray-900 truncate">{name}</h3>
        <span className="text-lg font-bold text-gray-900">
          ${price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
