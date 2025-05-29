'use client';

import { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { timeAtom, is24HourAtom, formattedTimeAtom } from '@/store/time';

export function useTime() {
  const [mounted, setMounted] = useState(false);
  const setTime = useSetAtom(timeAtom);
  const [is24Hour, setIs24Hour] = useAtom(is24HourAtom);
  const formattedTime = useAtomValue(formattedTimeAtom);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [setTime]);

  return {
    ...formattedTime,
    is24Hour,
    toggleTimeFormat: () => setIs24Hour(!is24Hour),
    mounted,
  };
}








 