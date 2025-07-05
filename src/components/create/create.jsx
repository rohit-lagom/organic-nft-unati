'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import StackIcon from '@/assets/images/create/Stack.svg';
import DualPhotoIcon from '@/assets/images/create/DualPhoto.svg';
import SphereIcon from '@/assets/images/create/Sphere.svg';
import HeroBg from '@/assets/images/HeroBg.png';

const cards = [
  {
    title: 'Generate a collection',
    icon: StackIcon,
    hoverBg: 'from-purple-600 to-fuchsia-600',
  },
  {
    title: 'Drop your artwork',
    icon: DualPhotoIcon,
    hoverBg: 'from-pink-500 to-yellow-400',
  },
  {
    title: 'Build your world',
    icon: SphereIcon,
    hoverBg: 'from-cyan-400 to-blue-500',
  },
];

export default function Create() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatOffset({
        x: Math.sin(Date.now() / 1000) * 10,
        y: Math.cos(Date.now() / 1000) * 10,
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 30;
    const y = (e.clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#242424] text-white overflow-hidden px-4 sm:px-6 md:px-8 py-16 sm:py-24 lg:py-32"
      onMouseMove={handleMouseMove}
    >
      <Image
        src={HeroBg}
        alt="Hero Background"
        fill
        className="object-cover z-0"
        priority
      />

      <div
        className="absolute inset-0 z-0 flex flex-wrap justify-center items-center opacity-10 pointer-events-none"
        style={{
          transform: `translate(${floatOffset.x}px, ${floatOffset.y}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {[StackIcon, DualPhotoIcon, SphereIcon, StackIcon].map((icon, idx) => (
          <div
            key={idx}
            className="m-8 p-6 border border-white/10 rounded-xl backdrop-blur-md bg-white/5"
          >
            <Image
              src={icon}
              alt={`Decorative ${idx}`}
              width={40}
              height={40}
              className="filter invert brightness-0"
            />
          </div>
        ))}
      </div>

      <div
        className="relative z-10 text-center max-w-2xl mx-auto"
        style={{
          transform: `translate(${mousePos.x / 8}px, ${mousePos.y / 8}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Start free and <br className="hidden sm:block" /> create your own story
        </h2>

        <button className="mt-4 px-8 py-4 bg-purple-600 cursor-pointer hover:bg-purple-700 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105">
          + Create Now
        </button>
      </div>

      <div
        className="relative z-10 mt-16 flex flex-col sm:flex-row items-center gap-6"
        style={{
          transform: `translate(${mousePos.x / 6}px, ${mousePos.y / 6}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            className={`group w-60 h-60 lg:w-72 lg:h-72 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out cursor-pointer relative overflow-hidden`}
          >
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.hoverBg}
                md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-all duration-500`}
            ></div>

            <div className="relative z-10 w-12 h-12 mb-4 transition-all duration-500 ease-in-out">
              <Image
                src={card.icon}
                alt={card.title}
                width={48}
                height={48}
                className="filter invert brightness-0"
              />
            </div>

            <div
              className={`absolute bottom-6 left-0 right-0 text-center text-white flex flex-col items-center gap-1
                md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-500 z-10`}
            >
              <span className="font-semibold">{card.title}</span>
              <span className="text-3xl leading-none">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
