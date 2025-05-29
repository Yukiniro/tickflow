'use client';

import { useTime } from '@/hooks/use-time';

function FlipDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[32vw] w-[32vw] max-h-64 max-w-64 overflow-hidden rounded-lg bg-card shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-[16vw] font-bold">
          {String(value).padStart(2, '0')}
        </div>
        <div className="absolute inset-0 animate-flip bg-primary/10" />
      </div>
      <span className="mt-4 text-[4vw] font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function FlipClock() {
  const { hours, minutes, seconds, ampm, mounted } = useTime();

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center space-x-6">
        <FlipDigit value={hours} label="时" />
        <div className="text-[16vw] font-bold">:</div>
        <FlipDigit value={minutes} label="分" />
        <div className="text-[16vw] font-bold">:</div>
        <FlipDigit value={seconds} label="秒" />
      </div>
      {ampm && (
        <div className="text-[4vw] font-medium text-muted-foreground">{ampm}</div>
      )}
    </div>
  );
} 