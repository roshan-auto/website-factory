"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

// Mixed mock products to simulate a rich grid using our generated assets
const products = [
  { id: 1, name: "Celestial Aura Drops", image: "/images/signature/Woman_revealing_earring_202604131110.jpeg", price: "$65.00" },
  { id: 2, name: "Rose Petal studs", image: "/images/signature/Model_wearing_earring_202604131109.jpeg", price: "$55.00" },
  { id: 3, name: "Gilded Blossom set", image: "/images/signature/Earrings_with_matching_202604131110.jpeg", price: "$85.00" },
  { id: 4, name: "Signature Pearline", image: "/images/signature/Earrings_with_matching_202604131110 (1).jpeg", price: "$75.00" },
  { id: 5, name: "Artisan Curve", image: "/images/signature/Place_earring_onto_202604131109.jpeg", price: "$95.00" },
  { id: 6, name: "Ethereal 40mm Dangles", image: "/images/signature/Earring_height_40mm_202604131110.jpeg", price: "$80.00" },
  { id: 7, name: "Minimal 31mm Studs", image: "/images/signature/Earring_height_31_202604131110.jpeg", price: "$45.00" },
  { id: 8, name: "Classic 14mm Studs", image: "/images/signature/Stud_earrings_14mm_202604131110.jpeg", price: "$40.00" },
  { id: 9, name: "Geometric Precision", image: "/images/signature/Stud_earring_diameter_202604131110.jpeg", price: "$110.00" },
];

export function SignatureGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-5xl font-serif tracking-tight text-foreground mb-4">
              Curated Signatures
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Explore our most beloved handcrafted designs, shaped by intuition and defined by elegance.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex gap-2 group hover:bg-transparent hover:text-primary">
            View full collection
            <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-2xl bg-secondary/20">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/5" />
              </div>
              
              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-foreground tracking-wide group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 font-light">Handcrafted</p>
                </div>
                <div className="text-base font-semibold text-foreground">
                  {product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Button variant="outline" className="rounded-full px-8">
            View full collection
          </Button>
        </div>
        
      </div>
    </section>
  );
}
