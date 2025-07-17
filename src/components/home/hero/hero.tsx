'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import HeroBg from '@/assets/images/HeroBg.png';

import left1 from '@/assets/images/hero/left1.svg';
import left2 from '@/assets/images/hero/left2.svg';
import left3 from '@/assets/images/hero/left3.svg';
import left4 from '@/assets/images/hero/left4.svg';
import left5 from '@/assets/images/hero/left5.svg';
import left6 from '@/assets/images/hero/left6.svg';
import left7 from '@/assets/images/hero/left7.svg';

import right1 from '@/assets/images/hero/right1.svg';
import right2 from '@/assets/images/hero/right2.svg';
import right3 from '@/assets/images/hero/right3.svg';
import right4 from '@/assets/images/hero/right4.svg';
import right5 from '@/assets/images/hero/right5.svg';
import right6 from '@/assets/images/hero/right6.svg';
import right7 from '@/assets/images/hero/right7.svg';
import Button from '@/components/common/button/button';
import VerifyCertificateModal from '@/components/common/modals/VerifyCertificateModal';


const leftImages = [left1, left2, left3, left4, left5, left6, left7];
const rightImages = [right1, right2, right3, right4, right5, right6, right7];
const mobileImages = [left2, left3, left4, left5, right2, right3, right4, right5, right6];
const stats = [
  { value: '1000+ certified', label: 'organic farmers' },
  { value: '15+ years ', label: 'issuing organic certificates' },
  { value: '100% publicly', label: 'verifiable certificates' },
];

export function Hero() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-[#242424] text-white overflow-hidden px-4 sm:px-6 md:px-8 py-16 sm:py-24 lg:py-32 2xl:py-16"
    >
      <Image src={HeroBg} alt="Hero Background" fill className="object-cover z-0" priority />

      <div className="absolute top-0 left-0 right-0 flex opacity-50 md:hidden z-10">
        {mobileImages.slice(1, 7).map((img, idx) => (
          <div
            key={idx}
            className="relative"
            style={{
              width: '100%',
              zIndex: 4 - idx,
            }}
          >
            <div className="rounded-3xl">
              <Image
                src={img}
                alt={`Image ${idx + 1}`}
                className="w-48 h-48 object-cover -mt-14 rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>

 {leftImages.map((img, idx) => (
  <motion.div
    key={`left-${idx}`}
    initial={{ opacity: 0, y: 80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: idx * 0.1 }}
    style={{ y }}
    className={`absolute hidden lg:block z-10 ${
      idx === 0
        ? '-top-6 -left-10 2xl:-top-6 2xl:-left-10 md:w-32 md:h-20 lg:w-48 lg:h-36 2xl:w-48 2xl:h-36 xl:w-24 xl:-top-4 xl:-left-8'
        : idx === 1
        ? 'top-24 -left-20 2xl:top-24 2xl:-left-20 z-20 md:w-32 md:h-32 lg:w-64 lg:h-72 2xl:w-64 2xl:h-72 xl:h-48 xl:w-56 xl:top-38 xl:-left-20'
        : idx === 2
        ? 'top-25 left-32 2xl:top-25 2xl:left-32 md:w-32 md:h-24 lg:w-56 lg:h-56 2xl:w-56 2xl:h-56 xl:h-48 xl:w-48 xl:top-28 xl:left-20'
        : idx === 3
        ? 'top-86 -left-13 2xl:top-86 2xl:-left-13 md:w-32 md:h-24 lg:w-56 lg:h-64 2xl:w-56 2xl:h-64 xl:h-48 xl:w-48 xl:top-86 xl:-left-15'
        : idx === 4
        ? 'top-74 left-34 2xl:top-74 2xl:left-34 md:w-32 md:h-24 lg:w-64 lg:h-72 2xl:w-64 2xl:h-72 xl:h-48 xl:w-56 xl:top-74 xl:left-20'
        : idx === 5
        ? 'top-[37rem] -left-0 2xl:top-[37rem] 2xl:-left-0 md:w-32 md:h-24 lg:w-42 lg:h-48 2xl:w-42 2xl:h-48 xl:h-36 xl:w-36 xl:top-[34rem] xl:-left-2'
        : 'top-[34rem] left-36 2xl:top-[34rem] 2xl:left-36 md:w-32 md:h-24 lg:w-42 lg:h-48 2xl:w-42 2xl:h-48 xl:h-36 xl:w-36 xl:top-[32rem] xl:left-28'
    }`}
  >
    <Image src={img} alt={`Left ${idx + 1}`} className="w-full h-full" />
  </motion.div>
))}


      {rightImages.map((img, idx) => (
        <motion.div
          key={`right-${idx}`}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: idx * 0.1 }}
          style={{ y }}
          className={`absolute hidden lg:block z-10 ${idx === 0
            ? '-top-6 -right-10 2xl:-top-6 2xl:-right-10 md:w-32 md:h-20 lg:w-48 lg:h-36 2xl:w-48 2xl:h-36 xl:w-24 xl:-top-4 xl:-right-8'
            : idx === 1
              ? 'top-24 -right-20 2xl:top-24 2xl:-right-20 z-20 md:w-32 md:h-32 lg:w-64 lg:h-72 2xl:w-64 2xl:h-72 xl:h-48 xl:w-56 xl:top-38 xl:-right-20'
              : idx === 2
                ? 'top-25 right-32 2xl:top-25 2xl:right-32 md:w-32 md:h-24 lg:w-56 lg:h-56 2xl:w-56 2xl:h-56 xl:h-48 xl:w-48 xl:top-28 xl:right-20'
                : idx === 3
                  ? 'top-86 -right-13 2xl:top-86 2xl:-right-13 md:w-32 md:h-24 lg:w-56 lg:h-64 2xl:w-56 2xl:h-64 xl:h-48 xl:w-48 xl:top-86 xl:-right-15'
                  : idx === 4
                    ? 'top-74 right-34 2xl:top-74 2xl:right-34 md:w-32 md:h-24 lg:w-64 lg:h-72 2xl:w-64 2xl:h-72 xl:h-48 xl:w-56 xl:top-74 xl:right-20'
                    : idx === 5
                      ? 'top-[37rem] -right-0 2xl:top-[37rem] 2xl:-right-0 md:w-32 md:h-24 lg:w-42 lg:h-48 2xl:w-42 2xl:h-48 xl:h-36 xl:w-36 xl:top-[34rem] xl:-right-2'
                      : 'top-[35rem] right-36 2xl:top-[35rem] 2xl:right-36 md:w-32 md:h-24 lg:w-42 lg:h-48 2xl:w-42 2xl:h-48 xl:h-36 xl:w-36 xl:top-[32rem] xl:right-28'
            }`}
        >
          <Image src={img} alt={`Right ${idx + 1}`} className="w-full h-full" />
        </motion.div>
      ))}

      <div className="text-center z-20 relative max-w-5xl mx-auto mt-24 2xl:mt-0 md:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight">
          Trust <span className="text-purple-500">Organic</span>
          <br className="hidden sm:block" />
          <span className="text-purple-500">Verify</span> On-Chain
        </h1>

        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Every organic certificate from Unati is now minted as an NFT — verifiable, immutable, and publicly accessible, bringing full transparency to every product.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button onClick={() => setVerifyModalOpen(true)}>Verify Certificate</Button>
          <Button onClick={() => router.push('/view')}>
  Certified Products
            </Button>
        </div>

        <div className="mt-16 sm:mt-20 flex flex-col md:flex-row justify-center gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="border border-white/10 backdrop-blur-lg rounded-xl px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 shadow-md"
            >
              <p className="text-lg sm:text-xl md:text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <VerifyCertificateModal
        isOpen={isVerifyModalOpen}
        onClose={() => setVerifyModalOpen(false)}
      />
    </section>
  );
}
