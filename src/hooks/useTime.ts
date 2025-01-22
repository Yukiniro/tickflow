import { useState, useEffect } from "react";

export default function useTime() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    let rafId: number;
    const updateTime = () => {
      setTime(new Date());
      rafId = requestAnimationFrame(updateTime);
    };
    rafId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const timeList = time.toTimeString().slice(0, 8).split(":");
  const hour = timeList[0];
  const minute = timeList[1];
  const second = timeList[2];

  return { hour, minute, second, str: `${hour}:${minute}:${second}` };
}
