import React from "react";
import ProductCard from "./ProductCard";

const dummyProducts = [
  {
    id: 1,
    name: "Classic Wool Coat",
    price: 129.99,
    category: "Women",
    image:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Leather Bomber Jacket",
    price: 189.5,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Chunky Knit Sweater",
    price: 89.0,
    category: "Unisex",
    image:
      "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "Slim Fit Denim",
    price: 59.99,
    category: "Men",
    image:
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=400",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-gray-50 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          <p className="text-gray-500 mt-2">Curated picks for the season.</p>
        </div>
        <a href="#" className="text-indigo-600 font-medium hover:underline">
          View All &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
