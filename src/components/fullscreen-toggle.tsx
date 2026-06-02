"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { trackFullscreenToggle } from "@/components/google-analytics";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LuMaximize2 as Maximize2, LuMinimize2 as Minimize2 } from "react-icons/lu";

// 带浏览器厂商前缀的全屏 API 类型(Safari/Firefox/旧版 IE)
interface FullscreenDocument extends Document {
  webkitFullscreenEnabled?: boolean;
  mozFullScreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  mozFullScreenElement?: Element | null;
  msFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
}

interface FullscreenElement extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
}

export function FullscreenToggle() {
  const t = useTranslations("fullscreen");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 检查是否支持全屏 API
  const isFullscreenSupported = () => {
    const doc = document as FullscreenDocument;
    return !!(
      document.fullscreenEnabled ||
      doc.webkitFullscreenEnabled ||
      doc.mozFullScreenEnabled ||
      doc.msFullscreenEnabled
    );
  };

  // 获取当前全屏元素
  const getFullscreenElement = () => {
    const doc = document as FullscreenDocument;
    return (
      document.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  };

  // 进入全屏
  const enterFullscreen = async (element: HTMLElement) => {
    const el = element as FullscreenElement;
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        await el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        await el.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }
  };

  // 退出全屏
  const exitFullscreen = async () => {
    const doc = document as FullscreenDocument;
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (doc.webkitExitFullscreen) {
        await doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        await doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        await doc.msExitFullscreen();
      }
    } catch (error) {
      console.error("Error exiting fullscreen:", error);
    }
  };

  // 切换全屏
  const handleToggle = async () => {
    const fullscreenElement = getFullscreenElement();

    if (fullscreenElement) {
      // 如果已经在全屏，则退出
      await exitFullscreen();
    } else {
      // 如果不在全屏，则进入全屏
      const clockContainer = document.querySelector("[data-clock-container]") as HTMLElement;
      if (clockContainer) {
        await enterFullscreen(clockContainer);
      }
    }
  };

  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!getFullscreenElement();
      setIsFullscreen(isCurrentlyFullscreen);
      trackFullscreenToggle(isCurrentlyFullscreen);
    };

    // 添加各种浏览器前缀的事件监听器
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // 初始化状态:挂载时读取当前全屏态,属预期的 effect 内同步置位
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFullscreen(!!getFullscreenElement());

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  // 如果不支持全屏，则不显示按钮
  if (!isFullscreenSupported()) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleToggle}
            aria-label={isFullscreen ? t("exitAria") : t("enterAria")}
            tabIndex={0}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t("exit")}</span>
              </>
            ) : (
              <>
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t("enter")}</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isFullscreen ? t("exitTooltip") : t("enterTooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
