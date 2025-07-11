'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  Home,
  Settings,
  ClipboardList,
  ShoppingCart,
  BarChart2,
  HelpCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { title: 'Overview', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
  { title: 'Settings', href: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  { title: 'Projects', href: '/dashboard/projects', icon: <ClipboardList className="w-5 h-5" />, comingSoon: true },
  { title: 'Marketplace', href: '/dashboard/marketplace', icon: <ShoppingCart className="w-5 h-5" />, comingSoon: true },
  { title: 'Orders', href: '/dashboard/orders', icon: <ShoppingCart className="w-5 h-5" />, comingSoon: true },
  { title: 'Analytics', href: '/dashboard/analytics', icon: <BarChart2 className="w-5 h-5" />, comingSoon: true },
  { title: 'Support', href: '/dashboard/support', icon: <HelpCircle className="w-5 h-5" />, comingSoon: true },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const handleComingSoonClick = () => {
    setPopupMessage('🚧 This feature is coming soon!');
  };

  const renderNavItem = (
    title: string,
    href: string,
    icon: React.ReactNode,
    isActive: boolean,
    comingSoon?: boolean,
    onClick?: () => void
  ) => {
    if (comingSoon) {
      return (
        <button
          key={href}
          type="button"
          onClick={handleComingSoonClick}
          className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-white/60 bg-white/5 hover:bg-white/10 transition w-full"
        >
          <div className="flex items-center gap-3 normal-case">
            {icon}
            <span>{title}</span>
          </div>
          <span className="ml-auto text-[11px] tracking-wide bg-white/10 text-white/70 px-2 py-0.5 rounded-full whitespace-nowrap">
            coming soon
          </span>
        </button>
      );
    }

    return (
      <Link
        key={href}
        href={href}
        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition w-full ${
          isActive
            ? 'bg-white text-black font-semibold'
            : 'text-white/80 hover:bg-white/10'
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3 normal-case">
          {icon}
          <span>{title}</span>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 bg-[#1e1e1e] border-r border-white/10 p-6">
        <h2 className="text-lg font-semibold mb-8 text-white">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {NAV_ITEMS.map(({ title, href, icon, comingSoon }) => {
            const isActive = pathname === href;
            return renderNavItem(title, href, icon, isActive, comingSoon);
          })}
        </nav>
      </aside>

      {/* Mobile Slide-In Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#1e1e1e] border-r border-white/10 p-6 min-h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-white">Dashboard</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ title, href, icon, comingSoon }) => {
                const isActive = pathname === href;
                return renderNavItem(
                  title,
                  href,
                  icon,
                  isActive,
                  comingSoon,
                  () => setSidebarOpen(false)
                );
              })}
            </nav>
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Popup Notification */}
      {popupMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#333] text-white text-sm px-4 py-2 rounded-md shadow-lg z-[999] transition-opacity duration-300">
          {popupMessage}
        </div>
      )}
    </>
  );
}
