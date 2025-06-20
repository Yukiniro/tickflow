// Pexels API 服务
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY || 'YOUR_PEXELS_API_KEY';
const PEXELS_API_URL = 'https://api.pexels.com/v1';

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

export interface PexelsResponse {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

export interface PexelsCollection {
  id: string;
  title: string;
  description?: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
}

export interface PexelsCollectionsResponse {
  collections: PexelsCollection[];
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  prev_page?: string;
}

// 搜索图片
export async function searchPhotos(
  query: string = 'nature',
  page: number = 1,
  perPage: number = 10,
): Promise<PexelsResponse> {
  try {
    const response = await fetch(
      `${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape&size=large`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching photos from Pexels:', error);
    throw error;
  }
}

// 获取精选图片
export async function getCuratedPhotos(
  page: number = 1,
  perPage: number = 10
): Promise<PexelsResponse> {
  try {
    const response = await fetch(
      `${PEXELS_API_URL}/curated?page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching curated photos from Pexels:', error);
    throw error;
  }
}

// 获取随机背景图片（使用精选图片）
export async function getRandomBackgroundPhoto(): Promise<PexelsPhoto | null> {
  try {
    const response = await getCuratedPhotos(1, 10);
    
    if (response.photos && response.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.photos.length);
      return response.photos[randomIndex];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching random background photo:', error);
    return null;
  }
}

// 获取 Nature 类别的随机背景图片
export async function getRandomNaturePhoto(): Promise<PexelsPhoto | null> {
  try {

    const queryList = ['nature', 'mountain', 'forest', 'ocean'];
    const response = await searchPhotos(queryList[Math.floor(Math.random() * queryList.length)]);
    if (response.photos && response.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.photos.length);
      return response.photos[randomIndex];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching random nature photo:', error);
    return null;
  }
}



// 预定义的背景类别
export const BACKGROUND_CATEGORIES = [
  'nature',
  'landscape', 
  'city',
  'abstract',
  'minimal',
  'ocean',
  'mountain',
  'forest',
] as const;

export type BackgroundCategory = typeof BACKGROUND_CATEGORIES[number];

// 获取本地化的背景类别标签的辅助函数
export function getLocalizedCategoryLabel(
  category: BackgroundCategory,
  t: (key: string) => string
): string {
  return t(`background.categories.${category}`);
} 