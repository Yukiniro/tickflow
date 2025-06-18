"use client";

import { useState, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import {
  enabledAtom,
  categoryAtom,
  opacityAtom,
  blurAtom,
  loadingAtom,
  sourceTypeAtom,
  selectedCollectionAtom,
  collectionsAtom,
  collectionsLoadingAtom,
  setEnabledAtom,
  setCategoryAtom,
  setOpacityAtom,
  setBlurAtom,
  setCurrentPhotoAtom,
  setLoadingAtom,
  setErrorAtom,
  setSourceTypeAtom,
  setSelectedCollectionAtom,
  setCollectionsAtom,
  setCollectionsLoadingAtom,
} from "@/store/background";
import {
  BACKGROUND_CATEGORIES,
  getRandomBackgroundPhoto,
  getRandomCollectionPhoto,
  getCollections,
} from "@/lib/pexels";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Image as ImageIcon, Settings, RefreshCw, Grid, Tag } from "lucide-react";

export function BackgroundToggle() {
  const t = useTranslations("background");
  const enabled = useAtomValue(enabledAtom);
  const category = useAtomValue(categoryAtom);
  const opacity = useAtomValue(opacityAtom);
  const blur = useAtomValue(blurAtom);
  const loading = useAtomValue(loadingAtom);
  const sourceType = useAtomValue(sourceTypeAtom);
  const selectedCollection = useAtomValue(selectedCollectionAtom);
  const collections = useAtomValue(collectionsAtom);
  const collectionsLoading = useAtomValue(collectionsLoadingAtom);

  const setEnabled = useSetAtom(setEnabledAtom);
  const setCategory = useSetAtom(setCategoryAtom);
  const setOpacity = useSetAtom(setOpacityAtom);
  const setBlur = useSetAtom(setBlurAtom);
  const setCurrentPhoto = useSetAtom(setCurrentPhotoAtom);
  const setLoading = useSetAtom(setLoadingAtom);
  const setError = useSetAtom(setErrorAtom);
  const setSourceType = useSetAtom(setSourceTypeAtom);
  const setSelectedCollection = useSetAtom(setSelectedCollectionAtom);
  const setCollections = useSetAtom(setCollectionsAtom);
  const setCollectionsLoading = useSetAtom(setCollectionsLoadingAtom);

  const [mounted, setMounted] = useState(false);

  // 设置挂载状态
  useEffect(() => {
    setMounted(true);
  }, []);

  // 加载 Collections
  useEffect(() => {
    const loadCollections = async () => {
      if (!mounted || collections.length > 0) return; // 已经加载过了

      setCollectionsLoading(true);
      try {
        const response = await getCollections();
        setCollections(response.collections);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setCollectionsLoading(false);
      }
    };

    loadCollections();
  }, [mounted, collections.length, setCollections, setCollectionsLoading]);

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
      let photo;
      if (sourceType === "collection" && selectedCollection) {
        photo = await getRandomCollectionPhoto(selectedCollection);
      } else {
        photo = await getRandomBackgroundPhoto(category);
      }

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

  // 改变背景类别
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSourceType("category");
  };

  // 改变背景 Collection
  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollection(collectionId);
    setSourceType("collection");
  };

  const currentCategoryLabel = BACKGROUND_CATEGORIES.find(cat => cat.key === category)?.label || "自然";
  const currentCollection = collections.find(col => col.id === selectedCollection);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <ImageIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{t("title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>{t("settings")}</DropdownMenuLabel>

        <DropdownMenuItem onClick={handleToggle} className="justify-between">
          <span>{t("enable")}</span>
          <div className={`w-4 h-4 rounded-full ${enabled ? "bg-green-500" : "bg-gray-300"}`} />
        </DropdownMenuItem>

        {enabled && (
          <>
            <DropdownMenuSeparator />

            {/* 图片来源选择 */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <Tag className="h-4 w-4" />
                <span>
                  {sourceType === "category"
                    ? `${t("category")}: ${currentCategoryLabel}`
                    : `${t("collection")}: ${currentCollection?.title || t("noSelection")}`}
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuLabel>{t("selectSource")}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* 类别选择 */}
                <DropdownMenuLabel>{t("byCategory")}</DropdownMenuLabel>
                {BACKGROUND_CATEGORIES.map(cat => (
                  <DropdownMenuItem
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={sourceType === "category" && category === cat.key ? "bg-accent" : ""}
                  >
                    {cat.label}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Collections 选择 */}
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <Grid className="h-4 w-4" />
                    <span>{t("byCollection")}</span>
                    {collectionsLoading && <RefreshCw className="h-3 w-3 animate-spin" />}
                  </div>
                </DropdownMenuLabel>
                {collections.slice(0, 10).map(collection => (
                  <DropdownMenuItem
                    key={collection.id}
                    onClick={() => handleCollectionChange(collection.id)}
                    className={sourceType === "collection" && selectedCollection === collection.id ? "bg-accent" : ""}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">{collection.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {collection.photos_count} {t("photosCount")}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

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
                step={0.1}
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
