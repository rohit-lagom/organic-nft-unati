'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

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

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-[#1e1e1e] border-r border-white/10 p-6">
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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#1e1e1e] border-r border-white/10 p-6 min-h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-white">Dashboard</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
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
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}
    </>
  );
}
