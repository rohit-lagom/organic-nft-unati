'use client';

import Code from "@/components/code/code";
import Explore from "@/components/explore/explore";
import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { Footer } from "@/components/footer/footer";
import TopCreators from "@/components/top-creators/top-creators";
import Create from "@/components/create/create";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Code />
      <Explore />
      <TopCreators />
      <Create />
      <Footer />
    </main>
  );
}
