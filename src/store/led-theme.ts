import { atomWithStorage } from "jotai/utils";
import { DEFAULT_LED_THEME } from "@/components/clock/led-themes";

// 仅持久化主题 id(而非整个对象),localStorage 体积最小、向前兼容
export const ledThemeIdAtom = atomWithStorage<string>("led-theme-id", DEFAULT_LED_THEME.id);
