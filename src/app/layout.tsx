import type { Metadata } from "next";
import React from "react";
// IMP START - Quick Start
import Provider from "../components/provider";
// IMP END - Quick Start
// IMP START - SSR
import { Toaster } from 'sonner';

import { cookieToWeb3AuthState } from "@web3auth/modal";
import { headers } from "next/headers";
// IMP END - SSR
import { Inter } from 'next/font/google';
import "./globals.css";
import HydrationProvider from "@/components/auth/hydration-provider";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Organic NFT',
  description: 'Minimal, Clean NFT Platform',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // IMP START - SSR
  const headersList = await headers();
  const web3authInitialState = cookieToWeb3AuthState(
    headersList.get("cookie")
  );
  // IMP END - SSR

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {/* IMP START - SSR */}
        <HydrationProvider />

        <Provider web3authInitialState={web3authInitialState}>
          <Toaster richColors position="top-center" />
          {children}
        </Provider>
        {/* IMP END - SSR */}
      </body>
    </html>
  );
}
