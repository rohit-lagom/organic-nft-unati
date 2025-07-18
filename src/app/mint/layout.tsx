import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Mint Products | Organic NFTs',
    description:
        'Easily mint tamper-proof, on-chain organic product certificates. Powered by IPFS and blockchain for full traceability and verification.',
};

export default function MintCertificatesLayout({ children }: { children: ReactNode }) {
    return (

        <section className={`${inter.className} bg-[#121212] text-white`}>
            <main>{children}</main>
        </section>

    );
}
