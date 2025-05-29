'use client';

import { useEffect, useState } from 'react';

export function useTime() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const formattedHours = is24Hour
    ? hours
    : hours === 0
      ? 12
      : hours > 12
        ? hours - 12
        : hours;


  const ampm = hours >= 12 ? 'PM' : 'AM';

  return {
    hours: formattedHours,
    minutes,
    seconds,
    ampm: is24Hour ? '' : ampm,
    is24Hour,
    toggleTimeFormat: () => setIs24Hour(!is24Hour),
    mounted,
  };
} 