'use client';

import { ComicClock } from '@/components/clock/comic-clock';

export default function ComicClockPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <ComicClock />
    </div>
  );
} 