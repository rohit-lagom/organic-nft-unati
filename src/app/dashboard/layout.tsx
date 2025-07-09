'use client';

import { ReactNode, useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/dashboard/sidebar/sidebar';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#242424] text-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md  cursor-pointer border border-white/20 hover:bg-white/10"
          >
            <Menu className="w-6 h-6 " />
          </button>
        </div>

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
