import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-purple-700 via-indigo-800 to-purple-800 text-white py-14">
      <div className="max-w-7xl mx-auto px-6 mt-9">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Latest Electronics at Best Prices
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>

              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-blue-600"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* Image with glow */}
          <div className="relative flex justify-center md:justify-end">
            {/* Glow */}
            <div className="absolute inset-0 -z-10 flex justify-center">
              <div className="w-72 h-72 bg-linear-to-tr from-blue-400 to-purple-500 rounded-full blur-3xl opacity-40" />
            </div>

            {/* Image */}
            <img
              src="/icart-hero1.png"
              alt="Electronics"
              className="w-full max-w-md rounded-xl shadow-2xl relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
