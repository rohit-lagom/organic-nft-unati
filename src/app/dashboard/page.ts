'use client';

import Image from 'next/image';

export default function DashboardHome() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Image
          src="/Logo.png"
          alt="User Avatar"
          width={56}
          height={56}
          className="rounded-full border border-white/10"
        />
        <div>
          <h2 className="text-lg font-semibold text-white">Welcome back, Rohit👋</h2>
          <p className="text-gray-400 text-sm">Organic NFTs Creator</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-white">Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Earnings', value: '$25,000' },
          { label: 'Collections', value: '8' },
          { label: 'Followers', value: '4,200' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg bg-[#2a2a2a] border border-white/10 shadow-md"
          >
            <h4 className="text-white text-base font-medium mb-1">{item.label}</h4>
            <p className="text-white text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
