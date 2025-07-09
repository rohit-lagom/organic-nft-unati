'use client';

import Code from "@/components/home/code/code";
import Explore from "@/components/home/explore/explore";
import { Navbar } from "@/components/home/navbar/navbar";
import { Hero } from "@/components/home/hero/hero";
import { Footer } from "@/components/home/footer/footer";
import TopCreators from "@/components/home/top-creators/top-creators";
import Create from "@/components/home/create/create";
import App from "@/components/App";
import { useWeb3AuthConnect } from "@web3auth/modal/react";

export default function Home() {
    const { connect } = useWeb3AuthConnect();

  return (
    <main>
     <Navbar  />
      <Hero onCreateClick={connect} />
      <App/>
      <Code />
      <Explore />
      <TopCreators />
      <Create />
      <Footer />
    </main>
  );
}
