import { atom } from "jotai";

export const timeAtom = atom(new Date());
export const is24HourAtom = atom(true);

// 派生 atom，用于格式化时间
export const formattedTimeAtom = atom(get => {
  const time = get(timeAtom);
  const is24Hour = get(is24HourAtom);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const formattedHours = is24Hour ? hours : hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

  const ampm = hours >= 12 ? "PM" : "AM";

  return {
    hours: formattedHours,
    minutes,
    seconds,
    ampm: is24Hour ? "" : ampm,
  };
});
