"use client";

import { useTranslations } from "next-intl";

export interface LedTheme {
  id: string;
  name: string;
  color: string;
  shadowColor: string;
  borderColor: string;
}

interface LedThemeSelectorProps {
  currentTheme: LedTheme;
  onThemeChange: (theme: LedTheme) => void;
  themes: LedTheme[];
}

export function LedThemeSelector({ currentTheme, onThemeChange, themes }: LedThemeSelectorProps) {
  const t = useTranslations("ledTheme");

  const handleThemeChange = (theme: LedTheme) => {
    onThemeChange(theme);
  };

  return (
    <div className="flex items-center justify-center gap-6 h-16">
      {themes.map(theme => (
        <div key={theme.id} className="relative">
          {/* 固定容器，预留ring和scale的空间 */}
          <div className="w-16 h-16 flex items-center justify-center">
            <button
              onClick={() => handleThemeChange(theme)}
              className={`
                relative w-12 h-12 rounded-full transition-all duration-300 
                focus:outline-none
                ${
                  currentTheme.id === theme.id
                    ? "ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800"
                    : ""
                }
              `}
              style={{
                backgroundColor: theme.color,
                boxShadow:
                  currentTheme.id === theme.id
                    ? `0 0 20px ${theme.shadowColor}, 0 0 40px ${theme.color}40`
                    : `0 0 10px ${theme.color}60`,
                transform: currentTheme.id === theme.id ? "scale(1.1)" : "scale(1)",
              }}
              onMouseEnter={e => {
                if (currentTheme.id !== theme.id) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={e => {
                if (currentTheme.id !== theme.id) {
                  e.currentTarget.style.transform = "scale(1)";
                } else {
                  e.currentTarget.style.transform = "scale(1.1)";
                }
              }}
              title={t(theme.name)}
              aria-label={t("selectColor", { color: t(theme.name) })}
            >
              {/* 选中状态指示器 - 始终渲染，只改变透明度 */}
              <div
                className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                  currentTheme.id === theme.id ? "opacity-100 animate-pulse" : "opacity-0"
                }`}
              >
                <div
                  className="absolute inset-1 rounded-full border-2 border-white/80"
                  style={{
                    boxShadow: `inset 0 0 10px ${theme.color}`,
                  }}
                />
              </div>

              {/* 颜色圆点 */}
              <div
                className="absolute inset-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: theme.color,
                  filter: "brightness(1.2)",
                }}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
