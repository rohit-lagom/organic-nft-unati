'use client';

import Sidebar from '@/app/dashboard/_components/sidebar/sidebar';
import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#242424] text-white">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        {/* Mobile Header */}
        <div className="md:hidden mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md border border-white/20 hover:bg-white/10"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <header className="hidden md:block mb-10">
          <h1 className="text-4xl font-extrabold">Dashboard</h1>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
