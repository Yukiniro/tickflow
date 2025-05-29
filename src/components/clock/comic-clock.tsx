'use client';

import { useTime } from '@/hooks/use-time';

export function ComicClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="font-comic text-[16vw] font-bold tracking-wider">
        {String(hours).padStart(2, '0')}
        <span>:</span>
        {String(minutes).padStart(2, '0')}
        <span>:</span>
        {String(seconds).padStart(2, '0')}
      </div>
      {ampm && (
        <div className="mt-6 text-[4vw] font-comic font-bold text-primary">{ampm}</div>
      )}
    </div>
  );
} 