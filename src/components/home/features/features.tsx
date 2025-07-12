'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import audit from '@/assets/images/features/audit.png'; 
import certificate from '@/assets/images/features/certificate.png'; 
import verification from '@/assets/images/features/verification.png'; 
import scale from '@/assets/images/features/instant-search.png'; 

const features = [
  {
    title: 'Organic NFT Certificates',
    description:
      'Mint verifiable credentials directly on-chain with farmer ID, standards, and validity.',
    href: '#',
    bg: 'from-purple-500 to-indigo-500',
    image: certificate,
  },
  {
    title: 'Public Verification Portal',
    description:
      'Instantly verify any certificate by ID, farmer name, or product.',
    href: '#',
    bg: 'from-pink-400 to-orange-400',
    image: verification,
  },
  {
    title: 'Audit-proof Traceability',
    description:
      'Track every change on-chain — trusted by regulators, buyers, and consumers.',
    href: '#',
    bg: 'from-green-400 to-blue-500',
    image: audit,
  },
  {
    title: 'Instant Search',
    description:
      'Immutable records with high-speed search for rapid access and scalability.',
    href: '#',
    bg: 'from-blue-400 to-purple-600',
    image: scale,
  },
];

const Features = () => {
  return (
    <section className="relative bg-[#242424] px-4 sm:px-6 md:px-8 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-12 text-center">
          What Makes Our Certificates Different
        </h2>

        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={'auto'}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          className="overflow-visible px-6"
        >
          {features.map((feature, index) => (
            <SwiperSlide
              key={index}
              className="!w-[300px] md:!w-[350px] overflow-visible py-10"
            >
              <Link
                href={feature.href}
                className={`flex flex-col justify-between bg-gradient-to-br ${feature.bg} rounded-3xl shadow-lg p-6 md:p-8 transition-transform hover:scale-105 h-[500px]`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm md:text-base  text-white/80">
                    {feature.description}
                  </p>
                </div>
                <div className="p-4 ">

                <Image
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-xl object-cover p-4 w-full h-full md:h-full"
                />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center justify-between mt-10 px-6">
          <div className="custom-pagination flex gap-2" />

          <div className="flex gap-4">
            <button className="custom-prev cursor-pointer text-white/70 hover:text-white transition text-xl">
              ←
            </button>
            <button className="custom-next cursor-pointer text-white/70 hover:text-white transition text-xl">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
