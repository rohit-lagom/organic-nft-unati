import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Certified Products | On-chain Organic Certificates',
  description: 'Explore certified organic products pinned to IPFS for verification and transparency.',
};

export default function ViewCertificatesLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#121212] text-white`}>
   
        <main>{children}</main>

      </body>
    </html>
  );
}
