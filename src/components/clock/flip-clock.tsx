'use client';

import { useTime } from '@/hooks/use-time';

function FlipDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-card shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold">
          {String(value).padStart(2, '0')}
        </div>
        <div className="absolute inset-0 animate-flip bg-primary/10" />
      </div>
      <span className="mt-4 text-lg font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

export function FlipClock() {
  const { hours, minutes, seconds, ampm } = useTime();

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center space-x-6">
        <FlipDigit value={hours} label="时" />
        <div className="text-6xl font-bold">:</div>
        <FlipDigit value={minutes} label="分" />
        <div className="text-6xl font-bold">:</div>
        <FlipDigit value={seconds} label="秒" />
      </div>
      <div className="text-4xl font-medium text-muted-foreground">{ampm}</div>
    </div>
  );
} 