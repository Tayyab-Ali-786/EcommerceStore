import React from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import SaleBanner from "../components/SaleBanner";
import MiniPromo from "../components/MiniPromo";
import BrandBenefits from "../components/BrandBenefits";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

// You would typically import your Navbar here as well
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* 0. Navbar (Assuming you have one from previous request) */}
      <Navbar />

      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Featured Categories */}
        <CategorySection />

        {/* 3. Featured Products */}
        <FeaturedProducts />

        {/* 4. Seasonal Sale Banner */}
        <SaleBanner />

        {/* 5. Mini Promo Sections */}
        <MiniPromo />

        {/* 6. Brand Benefits */}
        <BrandBenefits />

        {/* 7. Newsletter Signup */}
        <Newsletter />
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
