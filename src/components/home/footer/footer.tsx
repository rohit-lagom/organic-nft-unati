'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/Logo.png';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const footerSections = [
  {
    title: 'Organic Products',
    links: ['Jaggery', 'Apple Cider', 'Tea', 'Murabbas', 'Vinegar', 'Pickles'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Contact'],
  },
];

const certifierConsumerSections = [
  {
    title: 'For Certifiers',
    links: ['Issue Certificate', 'Join as a Certifier'],
  },
  {
    title: 'For Consumers',
    links: ['Explore Certificates', 'Verify Certificates', 'Explore Products'],
  },
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook },
  { name: 'Instagram', icon: Instagram },
  { name: 'LinkedIn', icon: Linkedin },
];

const linkClass = 'hover:opacity-80 hover:underline transition';

export function Footer() {
  return (
    <footer className="bg-[#242424] text-gray-300 px-4 sm:px-6 md:px-8 py-16 sm:pt-24 lg:pt-32">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-10">
            <Image src={Logo} alt="Logo"  height={272} className="rounded-md" />
            <span className="text-white text-2xl lg:text-3xl font-semibold"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-sm md:text-base lg:text-lg">
          <div>
            <h3 className="text-white font-semibold mb-4 text-base md:text-lg lg:text-xl">
              {footerSections[0].title}
            </h3>
            <ul className="space-y-2">
              {footerSections[0].links.map((link) => (
                <li key={link}>
                  <Link href="#" className={linkClass}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {certifierConsumerSections.map((section) => (
              <div key={section.title} className="mb-6 last:mb-0">
                <h3 className="text-white font-semibold mb-4 text-base md:text-lg lg:text-xl">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className={linkClass}>{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-base md:text-lg lg:text-xl">
              {footerSections[1].title}
            </h3>
            <ul className="space-y-2">
              {footerSections[1].links.map((link) => (
                <li key={link}>
                  <Link href="#" className={linkClass}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-base md:text-lg lg:text-xl">Follow Us</h3>
            <ul className="space-y-3">
              {socialLinks.map(({ name, icon: Icon }) => (
                <li key={name} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <Link href="#" className={linkClass}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center justify-between border-t border-white/10 rounded-2xl mt-12 py-4 px-6 text-sm md:text-base lg:text-lg text-gray-400">
        <span>© {new Date().getFullYear()} Organic NFT</span>
        <div className="flex gap-6 mt-4 md:mt-0">
          {['Privacy Policy', 'Terms of Service'].map((link) => (
            <Link key={link} href="#" className={linkClass}>{link}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
