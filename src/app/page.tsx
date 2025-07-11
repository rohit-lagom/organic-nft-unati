'use client';

import Code from "@/components/home/features/features";
import Explore from "@/components/home/explore/explore";
import { Navbar } from "@/components/home/navbar/navbar";
import { Hero } from "@/components/home/hero/hero";
import { Footer } from "@/components/home/footer/footer";
import Create from "@/components/home/create/create";
// import App from "@/components/App";
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import Features from "@/components/home/features/features";
import OrganicProducts from "@/components/home/organic-products/organic-products";

export default function Home() {
    const { connect } = useWeb3AuthConnect();

  return (
    <main>
     <Navbar  />
      <Hero onCreateClick={connect} />
      {/* <App/> */}
      <Features/>
      <Explore/>
      <OrganicProducts/>
      <Create />
      <Footer/>
    </main>
  );
}
