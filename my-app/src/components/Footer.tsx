import React from "react";
import { Instagram, Facebook, Twitter, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            CLOTHING STORE
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            We redefine modern fashion with sustainable materials and timeless
            designs. Crafted for the bold.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Customer Care</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-indigo-600">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-indigo-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
          <div className="flex space-x-4 mb-6">
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-indigo-600">
              <Twitter size={20} />
            </a>
          </div>
          <h4 className="font-semibold text-gray-900 mb-4">We Accept</h4>
          <div className="flex gap-2 text-gray-400">
            <CreditCard size={24} />
            <span className="text-xs border border-gray-300 px-1 rounded flex items-center">
              VISA
            </span>
            <span className="text-xs border border-gray-300 px-1 rounded flex items-center">
              PAYPAL
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
        © 2025 Clothing Store. All rights reserved.
      </div>
    </footer>
  );
}
