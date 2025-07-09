'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, Settings, ClipboardList, ShoppingCart, BarChart2, HelpCircle } from 'lucide-react';

const NAV_ITEMS = [
  { title: 'Overview',    href: '/dashboard',           icon: <Home className="w-5 h-5" /> },
  { title: 'Settings',    href: '/dashboard/settings',  icon: <Settings className="w-5 h-5" /> },
  { title: 'Projects',    href: '/dashboard/projects',  icon: <ClipboardList className="w-5 h-5" /> },
  // { title: 'Collections', href: '/dashboard/collections', icon: <Collection className="w-5 h-5" /> },
  { title: 'Marketplace', href: '/dashboard/marketplace', icon: <ShoppingCart className="w-5 h-5" /> },
  { title: 'Orders',      href: '/dashboard/orders',    icon: <ShoppingCart className="w-5 h-5" />} ,
  { title: 'Analytics',   href: '/dashboard/analytics', icon: <BarChart2 className="w-5 h-5" /> },
  { title: 'Support',     href: '/dashboard/support',   icon: <HelpCircle className="w-5 h-5" /> },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-64 bg-[#1e1e1e] border-r border-white/10 p-6">
        <h2 className="text-lg font-semibold mb-8 text-white">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {NAV_ITEMS.map(({ title, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center  gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {icon}
                {title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile slide‑in */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#1e1e1e] border-r border-white/10 p-6 min-h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-white">Dashboard</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
                <X className="w-6 h-6  cursor-pointer" />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map(({ title, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive
                        ? 'bg-white text-black font-semibold'
                        : 'text-white hover:bg-white/10'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {icon}
                    {title}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </>
  );
}
