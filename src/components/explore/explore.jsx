'use client';

import Image from 'next/image';
import DottedBG from '@/assets/images/DottedBG.png';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const buttons = [
  { text: 'Watch tutorials', href: '#' },
  { text: 'View guides', href: '#' },
  { text: 'Read articles', href: '#' },
];

const Explore = () => {
  return (
    <section
      className="relative bg-[#242424] text-white overflow-hidden min-h-[80vh] flex items-center px-4 sm:px-6 md:px-8 py-16 sm:py-24 lg:py-32 bg-contain"
      style={{
        backgroundImage: `url(${DottedBG.src})`,
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'contain',
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20 lg:gap-28">
        {/* Left Side */}
        <div className="text-center md:text-left">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-10">
            Let’s dive in and<br /> learn the basics
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-3 text-xl md:text-2xl lg:text-3xl font-medium">
            <Image
              src="/favicon.ico" 
              alt="Logo"
              width={32}
              height={32}
            />
            <span>
              Organic <span className="font-normal">school</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto">
          {buttons.map(({ text, href }) => (
            <Link
              key={text}
              href={href}
              className="flex justify-between items-center px-10 py-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-gray-500/50 hover:bg-purple-600 hover:border-purple-700 transition text-xl md:text-2xl font-semibold shadow-md"
            >
              {text}
              <ArrowRight className="w-7 h-7" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
