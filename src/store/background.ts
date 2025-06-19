import { atom } from 'jotai';
import { PexelsPhoto } from '@/lib/pexels';
import { atomWithStorage } from 'jotai/utils'

// 基础状态 atoms
export const currentPhotoAtom = atom<PexelsPhoto | null>(null);
export const enabledAtom = atomWithStorage('background-enabled', false);
export const opacityAtom = atomWithStorage('background-opacity', 0.95);
export const blurAtom = atomWithStorage('background-blur', 2);
export const loadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);

// 派生 atoms
export const backgroundSettingsAtom = atom(
  (get) => ({
    currentPhoto: get(currentPhotoAtom),
    enabled: get(enabledAtom),
    opacity: get(opacityAtom),
    blur: get(blurAtom),
    loading: get(loadingAtom),
    error: get(errorAtom),
  })
);

// 写入 atoms
export const setCurrentPhotoAtom = atom(
  null,
  (_get, set, photo: PexelsPhoto | null) => {
    set(currentPhotoAtom, photo);
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

export const resetBackgroundSettingsAtom = atom(
  null,
  (_get, set) => {
    set(currentPhotoAtom, null);
    set(enabledAtom, false);
    set(opacityAtom, 0.95);
    set(blurAtom, 2);
    set(loadingAtom, false);
    set(errorAtom, null);
  }
); 