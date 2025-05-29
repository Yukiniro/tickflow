'use client';

import { useTime } from '@/hooks/use-time';

export function BasicClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-[16vw] font-bold tabular-nums tracking-wider">
        {String(hours).padStart(2, '0')}
        <span>:</span>
        {String(minutes).padStart(2, '0')}
        <span>:</span>
        {String(seconds).padStart(2, '0')}
      </div>
      {ampm && (
        <div className="text-[4vw] font-medium text-muted-foreground">{ampm}</div>
      )}
    </div>
  );
} 