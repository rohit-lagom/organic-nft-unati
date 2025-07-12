'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useWeb3AuthConnect } from '@web3auth/modal/react';
import { toast } from 'sonner';

import { Navbar } from "@/components/home/navbar/navbar";
import { Hero } from "@/components/home/hero/hero";
import { Footer } from "@/components/home/footer/footer";
import Features from "@/components/home/features/features";
import OrganicProducts from "@/components/home/organic-products/organic-products";
import PublicExplorer from "@/components/home/public-explorer/public-explorer";
import Supporters from "@/components/home/supporters/supporters";

export default function Home() {
  const searchParams = useSearchParams();
  const walletError = searchParams.get('wallet');
    const pathname = usePathname();

    const router = useRouter();

  const { connect } = useWeb3AuthConnect();

  useEffect(() => {
    if (walletError === 'false') {
      toast.warning('Wallet not connected. Please sign in.');
      connect(); 
      router.replace(pathname); 
    }
  }, [walletError, connect]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Supporters />
      <OrganicProducts />
      <PublicExplorer />
      <Footer />
    </main>
  );
}
