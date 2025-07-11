'use client';

import { ReactNode } from 'react';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen  text-white">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
