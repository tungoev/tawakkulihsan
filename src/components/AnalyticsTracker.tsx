'use client';

import { useEffect } from 'react';
import { trackVisit } from '@/app/actions';

export function AnalyticsTracker() {
  useEffect(() => {
    // Call the server action to track visit
    trackVisit();
  }, []);

  return null; // This component doesn't render anything
}
