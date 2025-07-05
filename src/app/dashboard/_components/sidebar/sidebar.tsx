'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { title: 'Home', href: '/dashboard' },
  { title: 'Settings', href: '/dashboard/settings' },
  { title: 'Projects', href: '/dashboard/projects' },
  { title: 'Collections', href: '/dashboard/collections' },
  { title: 'Marketplace', href: '/dashboard/marketplace' },
  { title: 'Orders', href: '/dashboard/orders' },
  { title: 'Analytics', href: '/dashboard/analytics' },
  { title: 'Support', href: '/dashboard/support' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#242424] border-r border-white/10 p-6 min-h-screen">
      <h2 className="text-lg font-semibold mb-8 text-white">Dashboard</h2>
      <nav className="flex flex-col gap-3">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={idx}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
