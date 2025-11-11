// Core type definitions for the Ad Personalization Engine

export type AdCategory = 'technology' | 'fashion' | 'food' | 'travel' | 'gaming' | 'fitness' | 'entertainment' | 'education';

export interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: AdCategory;
  tags: string[];
  targetAudience: string[];
  clickUrl: string;
  priority: number; // 1-10, higher = more important
}

export interface UserBehavior {
  views: ViewEvent[];
  clicks: ClickEvent[];
  preferences: CategoryPreference[];
}

export interface ViewEvent {
  adId: string;
  category: AdCategory;
  timestamp: number;
  duration: number; // in seconds
}

export interface ClickEvent {
  adId: string;
  category: AdCategory;
  timestamp: number;
}

export interface CategoryPreference {
  category: AdCategory;
  score: number; // 0-100
}

export interface UserProfile {
  id: string;
  name: string;
  interests: AdCategory[];
  behavior: UserBehavior;
}

export interface AdScore {
  ad: Ad;
  score: number;
  reasons: string[];
}
