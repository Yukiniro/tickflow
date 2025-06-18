import { atom } from 'jotai';
import { PexelsPhoto, PexelsCollection, type BackgroundCategory } from '@/lib/pexels';
import { atomWithStorage } from 'jotai/utils'

// 基础状态 atoms
export const currentPhotoAtom = atom<PexelsPhoto | null>(null);
export const categoryAtom = atomWithStorage<BackgroundCategory>('background-category', 'nature');
export const enabledAtom = atomWithStorage('background-enabled', false);
export const opacityAtom = atomWithStorage('background-opacity', 0.95);
export const blurAtom = atomWithStorage('background-blur', 2);
export const loadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);

// Collections 相关状态
export const sourceTypeAtom = atomWithStorage<'category' | 'collection'>('background-source-type', 'category');
export const selectedCollectionAtom = atomWithStorage<string | null>('background-collection-id', null);
export const collectionsAtom = atom<PexelsCollection[]>([]);
export const collectionsLoadingAtom = atom(false);

// 派生 atoms
export const backgroundSettingsAtom = atom(
  (get) => ({
    currentPhoto: get(currentPhotoAtom),
    category: get(categoryAtom),
    enabled: get(enabledAtom),
    opacity: get(opacityAtom),
    blur: get(blurAtom),
    loading: get(loadingAtom),
    error: get(errorAtom),
    sourceType: get(sourceTypeAtom),
    selectedCollection: get(selectedCollectionAtom),
    collections: get(collectionsAtom),
    collectionsLoading: get(collectionsLoadingAtom),
  })
);

// 写入 atoms
export const setCurrentPhotoAtom = atom(
  null,
  (_get, set, photo: PexelsPhoto | null) => {
    set(currentPhotoAtom, photo);
  }
);

export const setCategoryAtom = atom(
  null,
  (_get, set, category: BackgroundCategory) => {
    set(categoryAtom, category);
  }
);

export const setEnabledAtom = atom(
  null,
  (_get, set, enabled: boolean) => {
    set(enabledAtom, enabled);
  }
);

export const setOpacityAtom = atom(
  null,
  (_get, set, opacity: number) => {
    set(opacityAtom, Math.max(0, Math.min(1, opacity)));
  }
);

export const setBlurAtom = atom(
  null,
  (_get, set, blur: number) => {
    set(blurAtom, Math.max(0, Math.min(20, blur)));
  }
);

export const setLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(loadingAtom, loading);
  }
);

export const setErrorAtom = atom(
  null,
  (_get, set, error: string | null) => {
    set(errorAtom, error);
  }
);

// Collections 相关写入 atoms
export const setSourceTypeAtom = atom(
  null,
  (_get, set, sourceType: 'category' | 'collection') => {
    set(sourceTypeAtom, sourceType);
  }
);

export const setSelectedCollectionAtom = atom(
  null,
  (_get, set, collectionId: string | null) => {
    set(selectedCollectionAtom, collectionId);
  }
);

export const setCollectionsAtom = atom(
  null,
  (_get, set, collections: PexelsCollection[]) => {
    set(collectionsAtom, collections);
  }
);

export const setCollectionsLoadingAtom = atom(
  null,
  (_get, set, loading: boolean) => {
    set(collectionsLoadingAtom, loading);
  }
);

export const resetBackgroundSettingsAtom = atom(
  null,
  (_get, set) => {
    set(currentPhotoAtom, null);
    set(categoryAtom, 'nature');
    set(enabledAtom, false);
    set(opacityAtom, 0.3);
    set(blurAtom, 0);
    set(loadingAtom, false);
    set(errorAtom, null);
    set(sourceTypeAtom, 'category');
    set(selectedCollectionAtom, null);
    set(collectionsAtom, []);
    set(collectionsLoadingAtom, false);
  }
); 