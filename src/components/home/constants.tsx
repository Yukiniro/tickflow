import React from "react";
import {
  Clock,
  FlipHorizontal,
  Watch,
  Palette,
  Clock3,
  Zap,
  Smartphone,
  Paintbrush,
  Maximize,
  Globe,
  Image,
  Share2,
} from "lucide-react";

export const CONTACT_LINKS = [
  {
    type: "twitter" as const,
    href: "https://x.com/Yukiro94317534",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    isExternal: true,
  },
  {
    type: "email" as const,
    href: "mailto:yukiniro@hotmail.com",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    isExternal: false,
  },
  {
    type: "github" as const,
    href: "https://github.com/Yukiniro/tickflow",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    isExternal: true,
  },
];

export const CLOCK_FEATURES = [
  {
    type: "basic" as const,
    icon: Clock,
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
    hoverColor: "text-blue-600 dark:group-hover:text-blue-400",
    href: "/basic",
  },
  {
    type: "flip" as const,
    icon: FlipHorizontal,
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
    hoverColor: "text-purple-600 dark:group-hover:text-purple-400",
    href: "/flip",
  },
  {
    type: "digital" as const,
    icon: Watch,
    gradientFrom: "from-green-500",
    gradientTo: "to-green-600",
    hoverColor: "text-green-600 dark:group-hover:text-green-400",
    href: "/digital",
  },
  {
    type: "comic" as const,
    icon: Palette,
    gradientFrom: "from-pink-500",
    gradientTo: "to-pink-600",
    hoverColor: "text-pink-600 dark:group-hover:text-pink-400",
    href: "/comic",
  },
  {
    type: "analog" as const,
    icon: Clock3,
    gradientFrom: "from-orange-500",
    gradientTo: "to-orange-600",
    hoverColor: "text-orange-600 dark:group-hover:text-orange-400",
    href: "/analog",
  },
  {
    type: "led" as const,
    icon: Zap,
    gradientFrom: "from-cyan-500",
    gradientTo: "to-cyan-600",
    hoverColor: "text-cyan-600 dark:group-hover:text-cyan-400",
    href: "/led",
  },
];

export const HIGHLIGHT_FEATURES = [
  {
    type: "responsive" as const,
    icon: Smartphone,
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
  },
  {
    type: "themes" as const,
    icon: Paintbrush,
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
  },
  {
    type: "fullscreen" as const,
    icon: Maximize,
    gradientFrom: "from-green-500",
    gradientTo: "to-green-600",
  },
  {
    type: "multilingual" as const,
    icon: Globe,
    gradientFrom: "from-orange-500",
    gradientTo: "to-orange-600",
  },
  {
    type: "background" as const,
    icon: Image,
    gradientFrom: "from-pink-500",
    gradientTo: "to-pink-600",
  },
  {
    type: "share" as const,
    icon: Share2,
    gradientFrom: "from-cyan-500",
    gradientTo: "to-cyan-600",
  },
];

// 保持向后兼容
export const FEATURES = CLOCK_FEATURES;
