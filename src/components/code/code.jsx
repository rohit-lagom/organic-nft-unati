'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import card1 from '@/assets/images/Logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const features = [
    {
        title: 'Generative art',
        description:
            'Create your generative collection in a few clicks. Adjust layers, set rules, add rarity and preview within one tool.',
        href: '#',
        bg: 'from-purple-500 to-indigo-500',
        image: card1,
    },
    {
        title: 'Drops',
        description:
            'Transform your art—illustrations, videos, or photos—into limited or open edition NFTs and launch them on Ethereum, Polygon, or BASE.',
        href: 'https://bueno.art/drops',
        bg: 'from-pink-400 to-orange-400',
        image: card1,
    },
    {
        title: 'Buenoverse',
        description:
            'Turn ideas into interactive worlds and games. Collaborate with friends in real-time.',
        href: '#',
        bg: 'from-indigo-600 to-purple-700',
        image: card1,
    },
    {
        title: 'Smart contracts',
        description:
            'Easily mint NFTs without code. Create your own smart contract.',
        href: '#',
        bg: 'from-blue-400 to-purple-400',
        image: card1,
    },
    {
        title: 'Forms',
        description:
            'Create forms for allowlists, surveys, and more, with wallet checks and Discord roles.',
        href: '#',
        bg: 'from-green-400 to-blue-500',
        image: card1,
    },
];

const Code = () => {
    return (
        <section className="relative bg-[#242424] px-4 sm:px-6 md:px-8 py-16 sm:py-24 lg:py-32">
            <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-12 text-center">
                We ditch the code, but keep the magic ✨
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
                className="overflow-visible px-6 "
            >

                {features.map((feature, index) => (
                    <SwiperSlide key={index} className="!w-[300px] overflow-visible py-10">
                        <Link
                            href={feature.href}
                            className={`flex flex-col justify-between bg-gradient-to-br ${feature.bg} rounded-3xl shadow-lg p-6 md:p-8 transition-transform hover:scale-105 h-[500px]`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg md:text-xl font-bold">{feature.title}</h3>
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                                <p className="text-sm md:text-base mb-6">{feature.description}</p>
                            </div>
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                className="rounded-xl object-cover w-full h-48 md:h-56"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
                <br />

                <div className="custom-pagination  !staticflex justify-start gap-2" />
            </Swiper>
            <br />
            <div className="flex items-center justify-end mt-16 gap-6 h-14">
                <button className="custom-prev text-white/70 hover:text-white transition text-xl">
                    ←
                </button>
                <button className="custom-next text-white/70 hover:text-white transition text-xl">
                    →
                </button>
            </div>
        </section>
    );
};

export default Code;
