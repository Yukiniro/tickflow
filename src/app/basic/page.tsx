'use client';

import { BasicClock } from '@/components/clock/basic-clock';

export default function BasicClockPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <BasicClock />
    </div>
  );
}