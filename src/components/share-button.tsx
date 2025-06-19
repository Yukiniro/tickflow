"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Twitter } from "lucide-react";

export function ShareButton() {
  const t = useTranslations("share");

  // 分享到 Twitter
  const handleShareToTwitter = useCallback(() => {
    if (typeof window === "undefined") return;
    const text = encodeURIComponent(t("text"));
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}%20${url}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  }, [t]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleShareToTwitter}
            aria-label={t("twitterAria")}
            tabIndex={0}
          >
            <Twitter className="h-4 w-4 text-blue-400" />
            <span className="hidden sm:inline">{t("twitter")}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("twitterTooltip")}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
