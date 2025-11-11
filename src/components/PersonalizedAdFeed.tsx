import React, { useMemo } from 'react';
import { mockAds } from '../data/mockAds';
import { useBehaviorTracking } from '../context/BehaviorContext';
import { AdPersonalizationEngine } from '../utils/personalizationEngine';
import { AdCard } from './AdCard';
import './PersonalizedAdFeed.css';

interface PersonalizedAdFeedProps {
  limit?: number;
  showScores?: boolean;
}

export const PersonalizedAdFeed: React.FC<PersonalizedAdFeedProps> = ({ 
  limit = 10,
  showScores = true 
}) => {
  const { behavior, getCategoryPreferences } = useBehaviorTracking();

  // Set ad cache for the personalization engine
  React.useEffect(() => {
    AdPersonalizationEngine.setAdCache(mockAds);
  }, []);

  const personalizedAds = useMemo(() => {
    const preferences = getCategoryPreferences();
    
    // Check if user has any behavior data
    const hasInteractions = behavior.views.length > 0 || behavior.clicks.length > 0;
    
    if (!hasInteractions) {
      // Cold start - show diverse high-priority ads
      const coldStartAds = AdPersonalizationEngine.getColdStartAds(mockAds, limit);
      return coldStartAds.map(ad => ({
        ad,
        score: ad.priority * 10,
        reasons: ['Trending', 'Popular choice']
      }));
    }

    // Get personalized recommendations
    return AdPersonalizationEngine.getPersonalizedAds(
      mockAds,
      preferences,
      behavior,
      limit
    );
  }, [behavior, getCategoryPreferences, limit]);

  return (
    <div className="personalized-feed">
      <div className="feed-header">
        <h2>Personalized Ads For You</h2>
        <p className="feed-subtitle">
          {behavior.views.length > 0 || behavior.clicks.length > 0
            ? `Based on your ${behavior.views.length} views and ${behavior.clicks.length} clicks`
            : 'Discover popular ads tailored to your interests'}
        </p>
      </div>

      <div className="ad-grid">
        {personalizedAds.map(({ ad, score, reasons }) => (
          <AdCard
            key={ad.id}
            ad={ad}
            score={showScores ? score : undefined}
            reasons={reasons}
          />
        ))}
      </div>
    </div>
  );
};
