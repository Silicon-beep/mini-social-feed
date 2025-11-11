import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserBehavior, ViewEvent, ClickEvent, CategoryPreference, AdCategory } from '../types';

interface BehaviorContextType {
  behavior: UserBehavior;
  trackView: (adId: string, category: AdCategory, duration?: number) => void;
  trackClick: (adId: string, category: AdCategory) => void;
  getCategoryPreferences: () => CategoryPreference[];
  clearBehavior: () => void;
}

const BehaviorContext = createContext<BehaviorContextType | undefined>(undefined);

const STORAGE_KEY = 'ad_user_behavior';

// Initialize empty behavior
const getInitialBehavior = (): UserBehavior => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading behavior from storage:', error);
  }
  
  return {
    views: [],
    clicks: [],
    preferences: []
  };
};

export const BehaviorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [behavior, setBehavior] = useState<UserBehavior>(getInitialBehavior);

  // Save to localStorage whenever behavior changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
    } catch (error) {
      console.error('Error saving behavior to storage:', error);
    }
  }, [behavior]);

  // Track ad view
  const trackView = useCallback((adId: string, category: AdCategory, duration: number = 1) => {
    const viewEvent: ViewEvent = {
      adId,
      category,
      timestamp: Date.now(),
      duration
    };

    setBehavior(prev => ({
      ...prev,
      views: [...prev.views, viewEvent]
    }));
  }, []);

  // Track ad click
  const trackClick = useCallback((adId: string, category: AdCategory) => {
    const clickEvent: ClickEvent = {
      adId,
      category,
      timestamp: Date.now()
    };

    setBehavior(prev => ({
      ...prev,
      clicks: [...prev.clicks, clickEvent]
    }));
  }, []);

  // Calculate category preferences based on views and clicks
  const getCategoryPreferences = useCallback((): CategoryPreference[] => {
    const categoryScores: Record<AdCategory, number> = {
      technology: 0,
      fashion: 0,
      food: 0,
      travel: 0,
      gaming: 0,
      fitness: 0,
      entertainment: 0,
      education: 0
    };

    // Weight: Views = 1 point, Clicks = 5 points
    behavior.views.forEach(view => {
      categoryScores[view.category] += 1 * (view.duration / 5); // Longer views = more interest
    });

    behavior.clicks.forEach(click => {
      categoryScores[click.category] += 5;
    });

    // Apply recency decay (recent interactions are more valuable)
    const now = Date.now();
    const decayFactor = (timestamp: number) => {
      const ageInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
      return Math.exp(-ageInDays / 7); // Decay over 7 days
    };

    behavior.views.forEach(view => {
      const decay = decayFactor(view.timestamp);
      categoryScores[view.category] += decay * 0.5;
    });

    behavior.clicks.forEach(click => {
      const decay = decayFactor(click.timestamp);
      categoryScores[click.category] += decay * 2;
    });

    // Convert to preferences array and normalize to 0-100 scale
    const maxScore = Math.max(...Object.values(categoryScores), 1);
    
    const preferences: CategoryPreference[] = Object.entries(categoryScores).map(
      ([category, score]) => ({
        category: category as AdCategory,
        score: Math.round((score / maxScore) * 100)
      })
    );

    return preferences.sort((a, b) => b.score - a.score);
  }, [behavior]);

  // Clear all behavior data
  const clearBehavior = useCallback(() => {
    setBehavior({
      views: [],
      clicks: [],
      preferences: []
    });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <BehaviorContext.Provider
      value={{
        behavior,
        trackView,
        trackClick,
        getCategoryPreferences,
        clearBehavior
      }}
    >
      {children}
    </BehaviorContext.Provider>
  );
};

// Custom hook to use behavior context
export const useBehaviorTracking = () => {
  const context = useContext(BehaviorContext);
  if (!context) {
    throw new Error('useBehaviorTracking must be used within a BehaviorProvider');
  }
  return context;
};
