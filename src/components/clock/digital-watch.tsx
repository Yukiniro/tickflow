'use client';

import { useTime } from '@/hooks/use-time';

export function DigitalWatch() {
  const { hours, minutes, seconds, ampm } = useTime();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-3xl border-8 border-primary bg-background p-12 shadow-2xl">
        <div className="font-mono text-[16vw] font-bold tabular-nums text-primary">
          {String(hours).padStart(2, '0')}
          <span className="animate-pulse">:</span>
          {String(minutes).padStart(2, '0')}
          <span className="animate-pulse">:</span>
          {String(seconds).padStart(2, '0')}
        </div>
        <div className="mt-4 text-center text-[4vw] font-medium text-muted-foreground">
          {ampm}
        </div>
      </div>
    </div>
  );
} 