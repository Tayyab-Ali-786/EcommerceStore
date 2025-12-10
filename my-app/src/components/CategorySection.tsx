import React from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
}

const categories = [
  { title: "Men", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=600" },
  { title: "Women", image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=600" },
  { title: "Kids", image: "https://images.unsplash.com/photo-1519238263496-63f727285b2f?auto=format&fit=crop&q=80&w=600" },
  { title: "New Arrivals", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" },
  { title: "Best Sellers", image: "https://images.unsplash.com/photo-1485230946086-1d99d529a763?auto=format&fit=crop&q=80&w=600" },
  { title: "Sale", image: "https://images.unsplash.com/photo-1472851294608-4152ef3c656d?auto=format&fit=crop&q=80&w=600" },
];

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image }) => (
  <div className="group relative h-64 w-full overflow-hidden rounded-lg cursor-pointer">
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      style={{ backgroundImage: `url(${image})` }}
    />
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
    <div className="absolute inset-0 flex items-center justify-center">
      <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{title}</h3>
    </div>
  </div>
);

export default function CategorySection() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop By Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <CategoryCard key={index} {...cat} />
        ))}
      </div>
    </section>
  );
}