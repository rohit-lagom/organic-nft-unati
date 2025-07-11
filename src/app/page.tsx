'use client';

import { Navbar } from "@/components/home/navbar/navbar";
import { Hero } from "@/components/home/hero/hero";
import { Footer } from "@/components/home/footer/footer";
import Features from "@/components/home/features/features";
import OrganicProducts from "@/components/home/organic-products/organic-products";
import PublicExplorer from "@/components/home/public-explorer/public-explorer";
import Supporters from "@/components/home/supporters/supporters";

export default function Home() {

  return (
    <main>
     <Navbar  />
      <Hero />
      <Features/>
      <Supporters/>
      <OrganicProducts/>
      <PublicExplorer/>
      <Footer/>
    </main>
  );
}
