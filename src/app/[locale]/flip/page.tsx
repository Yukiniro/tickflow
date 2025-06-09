'use client';

import { FlipClock } from '@/components/clock/flip-clock';

export default function FlipClockPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <FlipClock />
    </div>
  );
} 