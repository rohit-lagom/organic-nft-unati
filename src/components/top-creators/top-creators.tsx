'use client';

import Image from 'next/image';
import Link from 'next/link';

import left1 from '@/assets/images/left/left1.webp';
import left2 from '@/assets/images/left/left2.png';
import left3 from '@/assets/images/left/left3.png';
import left4 from '@/assets/images/left/left4.webp';
import right1 from '@/assets/images/right/right1.webp';
import right2 from '@/assets/images/right/right2.webp';
import right3 from '@/assets/images/right/right3.webp';
import right4 from '@/assets/images/right/right4.webp';

const creators = [
  {
    image: left1,
    name: 'Creator A',
    description: 'Digital artist shaping new worlds',
    href: '#',
  },
  {
    image: right1,
    name: 'Creator B',
    description: 'Crafting immersive NFT drops',
    href: '#',
  },
  {
    image: left2,
    name: 'Creator C',
    description: 'Transforming code-free experiences',
    href: '#',
  },
  {
    image: right2,
    name: 'Creator D',
    description: 'Pushing the limits of generative art',
    href: '#',
  },
];

export default function TopCreators() {
  return (
    <section className="bg-[#242424] py-16 px-4 md:px-8 lg:px-16">
      <h2 className="text-white text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12">
        Real stories from top creators 💫
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {creators.map((creator, idx) => (
          <Link key={idx} href={creator.href} className="group block">
            <div className="rounded-2xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-purple-500 hover:scale-105 aspect-square">
              <div className="relative w-full h-full">
                <Image
                  src={creator.image}
                  alt={creator.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold">{creator.name}</h3>
                  <p className="text-gray-300 text-sm">{creator.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="#"
          className="inline-block px-6 py-2 border border-white/30 text-white rounded-full text-sm hover:border-white transition"
        >
          More from creators
        </Link>
      </div>
    </section>
  );
}
