"use client";

import { GoogleAnalytics as GA } from "@next/third-parties/google";
import { useEffect } from "react";

interface GoogleAnalyticsProps {
  gaId?: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  // 从环境变量获取 GA ID，如果没有传入的话
  const googleAnalyticsId = gaId || process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // 在开发环境下提供调试信息
    if (process.env.NODE_ENV === "development" && googleAnalyticsId) {
      console.log("Google Analytics initialized with ID:", googleAnalyticsId);
    }
  }, [googleAnalyticsId]);

  // 如果没有 GA ID，则不渲染组件
  if (!googleAnalyticsId) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Google Analytics ID not found. Please set NEXT_PUBLIC_GA_ID in your environment variables.");
    }
    return null;
  }

  return <GA gaId={googleAnalyticsId} />;
}

// 用于手动发送事件的工具函数
export const gtag = (...args: any[]) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// 常用的事件跟踪函数
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// 页面浏览跟踪
export const trackPageView = (url: string, title?: string) => {
  gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
    page_location: url,
    page_title: title,
  });
};

// 时钟类型切换跟踪
export const trackClockTypeChange = (clockType: string) => {
  trackEvent("clock_type_change", "navigation", clockType);
};

// 语言切换跟踪
export const trackLanguageChange = (language: string) => {
  trackEvent("language_change", "localization", language);
};

// 主题切换跟踪
export const trackThemeChange = (theme: string) => {
  trackEvent("theme_change", "customization", theme);
};

// 背景设置跟踪
export const trackBackgroundToggle = (enabled: boolean) => {
  trackEvent("background_toggle", "customization", enabled ? "enabled" : "disabled");
};

// 全屏模式跟踪
export const trackFullscreenToggle = (enabled: boolean) => {
  trackEvent("fullscreen_toggle", "interaction", enabled ? "enter" : "exit");
};

// 声音切换跟踪
export const trackSoundToggle = (enabled: boolean) => {
  trackEvent("sound_toggle", "customization", enabled ? "enabled" : "disabled");
};

// 时间格式切换跟踪
export const trackTimeFormatChange = (format: string) => {
  trackEvent("time_format_change", "customization", format);
};
