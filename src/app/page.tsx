'use client';

import Explore from "@/components/home/explore/explore";
import { Navbar } from "@/components/home/navbar/navbar";
import { Hero } from "@/components/home/hero/hero";
import { Footer } from "@/components/home/footer/footer";
import Features from "@/components/home/features/features";
import OrganicProducts from "@/components/home/organic-products/organic-products";
import PublicExplorer from "@/components/home/public-explorer/public-explorer";

export default function Home() {

  return (
    <main>
     <Navbar  />
      <Hero />
      <Features/>
      <Explore/>
      <OrganicProducts/>
      <PublicExplorer/>
      <Footer/>
    </main>
  );
}
