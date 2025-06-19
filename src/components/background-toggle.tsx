"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  enabledAtom,
  opacityAtom,
  blurAtom,
  loadingAtom,
  setEnabledAtom,
  setOpacityAtom,
  setBlurAtom,
  setCurrentPhotoAtom,
  setLoadingAtom,
  setErrorAtom,
} from "@/store/background";
import { getRandomBackgroundPhoto } from "@/lib/pexels";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Image as ImageIcon, RefreshCw } from "lucide-react";

export function BackgroundToggle() {
  const t = useTranslations("background");
  const enabled = useAtomValue(enabledAtom);
  const opacity = useAtomValue(opacityAtom);
  const blur = useAtomValue(blurAtom);
  const loading = useAtomValue(loadingAtom);

  const setEnabled = useSetAtom(setEnabledAtom);
  const setOpacity = useSetAtom(setOpacityAtom);
  const setBlur = useSetAtom(setBlurAtom);
  const setCurrentPhoto = useSetAtom(setCurrentPhotoAtom);
  const setLoading = useSetAtom(setLoadingAtom);
  const setError = useSetAtom(setErrorAtom);

  // 切换背景启用状态
  const handleToggle = () => {
    setEnabled(!enabled);
  };

  // 更换背景图片
  const handleRefresh = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);

    try {
      const photo = await getRandomBackgroundPhoto();
      if (photo) {
        setCurrentPhoto(photo);
      }
    } catch (error) {
      console.error("Error refreshing background:", error);
      setError("Failed to refresh background");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{t("title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>{t("settings")}</DropdownMenuLabel>

        <DropdownMenuItem onClick={handleToggle} className="justify-between">
          <span>{t("enable")}</span>
          <div className={`w-4 h-4 rounded-full ${enabled ? "bg-green-500" : "bg-gray-300"}`} />
        </DropdownMenuItem>

        {enabled && (
          <>
            <DropdownMenuSeparator />

            {/* 刷新背景 */}
            <DropdownMenuItem onClick={handleRefresh} disabled={loading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? t("refreshing") : t("refresh")}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* 透明度控制 */}
            <div className="px-2 py-2">
              <div className="text-sm font-medium mb-2">
                {t("opacity")}: {Math.round(opacity * 100)}%
              </div>
              <Slider
                value={[opacity]}
                onValueChange={values => setOpacity(values[0])}
                max={1}
                min={0}
                step={0.01}
                className="w-full"
              />
            </div>

            {/* 模糊度控制 */}
            <div className="px-2 py-2">
              <div className="text-sm font-medium mb-2">
                {t("blur")}: {blur}px
              </div>
              <Slider
                value={[blur]}
                onValueChange={values => setBlur(values[0])}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
