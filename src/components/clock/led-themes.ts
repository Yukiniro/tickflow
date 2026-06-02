export interface LedTheme {
  id: string;
  name: string;
  color: string;
  shadowColor: string;
  borderColor: string;
}

export const LED_THEMES: LedTheme[] = [
  {
    id: "green",
    name: "themes.green",
    color: "#22c55e",
    shadowColor: "rgba(34, 197, 94, 0.8)",
    borderColor: "border-green-500/30",
  },
  {
    id: "blue",
    name: "themes.blue",
    color: "#3b82f6",
    shadowColor: "rgba(59, 130, 246, 0.8)",
    borderColor: "border-blue-500/30",
  },
  {
    id: "red",
    name: "themes.red",
    color: "#ef4444",
    shadowColor: "rgba(239, 68, 68, 0.8)",
    borderColor: "border-red-500/30",
  },
  {
    id: "purple",
    name: "themes.purple",
    color: "#a855f7",
    shadowColor: "rgba(168, 85, 247, 0.8)",
    borderColor: "border-purple-500/30",
  },
  {
    id: "orange",
    name: "themes.orange",
    color: "#f97316",
    shadowColor: "rgba(249, 115, 22, 0.8)",
    borderColor: "border-orange-500/30",
  },
  {
    id: "cyan",
    name: "themes.cyan",
    color: "#06b6d4",
    shadowColor: "rgba(6, 182, 212, 0.8)",
    borderColor: "border-cyan-500/30",
  },
];

export const DEFAULT_LED_THEME = LED_THEMES[0];
