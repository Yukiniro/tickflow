'use client';

import { useEffect, useState } from 'react';

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  ampm: string;
}

export function useTime() {
  const [time, setTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: 'AM',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      setTime({
        hours: hours % 12 || 12,
        minutes,
        seconds,
        ampm: hours >= 12 ? 'PM' : 'AM',
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
} 