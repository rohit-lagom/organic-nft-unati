'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import jaggery from '@/assets/images/products/jaggery.jpg';
import appleCider from '@/assets/images/products/apple-cider.jpg';
import tea from '@/assets/images/products/tea.jpg';
import murabba from '@/assets/images/products/murabba.jpg';

const Supporters = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const supporterLogos = [
    { src: jaggery, alt: 'Organic Certifier A', url: '#' },
    { src: appleCider, alt: 'Organic Certifier B', url: '#' },
    { src: tea, alt: 'Organic Certifier C', url: '#' },
    { src: murabba, alt: 'Organic Certifier D', url: '#' },
  ];

  const scrollingLogos = [...supporterLogos, ...supporterLogos,...supporterLogos];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isHovered) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <section className="bg-[#242424] text-white px-4 sm:px-6 md:px-8 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10 overflow-hidden">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Backed By The Best In Organic
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Led by India’s most trusted cooperatives and certifying bodies.
          </p>
        </div>

        <div
          ref={containerRef}
          className="w-full flex gap-8 overflow-hidden whitespace-nowrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {scrollingLogos.map(({ src, alt, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={alt}
              className="flex-shrink-0"
            >
              <Image
                src={src}
                alt={alt}
                width={120}
                height={60}
                className="object-contain flex-shrink-0 hover:scale-105 transition-transform duration-300 cursor-pointer rounded-lg"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;
