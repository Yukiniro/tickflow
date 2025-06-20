"use client";

import { useEffect, useState, useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  currentPhotoAtom,
  enabledAtom,
  opacityAtom,
  blurAtom,
  loadingAtom,
  setCurrentPhotoAtom,
  setLoadingAtom,
  setErrorAtom,
} from "@/store/background";
import { getRandomNaturePhoto } from "@/lib/pexels";
import Image from "next/image";

export function BackgroundImage() {
  const t = useTranslations("background");
  const currentPhoto = useAtomValue(currentPhotoAtom);
  const enabled = useAtomValue(enabledAtom);
  const opacity = useAtomValue(opacityAtom);
  const blur = useAtomValue(blurAtom);
  const loading = useAtomValue(loadingAtom);

  const setCurrentPhoto = useSetAtom(setCurrentPhotoAtom);
  const setLoading = useSetAtom(setLoadingAtom);
  const setError = useSetAtom(setErrorAtom);

  const [mounted, setMounted] = useState(false);
  const [isHighResLoaded, setIsHighResLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 加载背景图片
  const loadBackgroundPhoto = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);
    setIsHighResLoaded(false);
    setImageError(false);

    try {
      const photo = await getRandomNaturePhoto();
      if (photo) {
        setCurrentPhoto(photo);
      } else {
        setError("Failed to load background image");
      }
    } catch (error) {
      console.error("Error loading background photo:", error);
      setError("Failed to load background image");
    } finally {
      setLoading(false);
    }
  };

  // 当启用状态改变时重新加载图片
  useEffect(() => {
    if (mounted && enabled) {
      loadBackgroundPhoto();
    }
  }, [mounted, enabled]);

  // 处理高分辨率图片加载完成
  const handleHighResLoad = () => {
    setIsHighResLoaded(true);
  };

  // 处理图片加载错误
  const handleImageError = () => {
    setImageError(true);
    setError("Failed to load background image");
  };

  // 如果未挂载、未启用或没有图片，不显示背景
  if (!mounted || !enabled || !currentPhoto) {
    return null;
  }

  return (
    <>
      {/* 背景图片容器 */}
      <div
        className="fixed inset-0 z-[-1] transition-all duration-1000"
        style={{
          opacity,
          filter: blur > 0 ? `blur(${blur}px)` : "none",
        }}
      >
        {/* 低分辨率占位图片 */}
        <Image
          src={currentPhoto.src.tiny}
          alt={currentPhoto.alt || "Background placeholder"}
          fill
          className="object-cover transition-opacity duration-700"
          style={{
            opacity: isHighResLoaded ? 0 : 1,
          }}
          priority
          onError={handleImageError}
          sizes="100vw"
          quality={75}
        />

        {/* 高分辨率图片 */}
        <Image
          src={currentPhoto.src.original}
          alt={currentPhoto.alt || "Background"}
          fill
          className="object-cover transition-opacity duration-700"
          style={{
            opacity: isHighResLoaded ? 1 : 0,
          }}
          onLoad={handleHighResLoad}
          onError={handleImageError}
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* 摄影师信息 */}
      {currentPhoto.photographer && (
        <div className="fixed bottom-4 right-4 z-10 opacity-60 hover:opacity-100 transition-opacity">
          <a
            href={currentPhoto.photographer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm"
          >
            Photo by {currentPhoto.photographer} on Pexels
          </a>
        </div>
      )}

      {/* 加载指示器 */}
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-black/50 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {t("loading")}
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {imageError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm">{t("error")}</div>
        </div>
      )}
    </>
  );
}
