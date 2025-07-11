'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export default function HydrationProvider() {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return null; // No UI
}
