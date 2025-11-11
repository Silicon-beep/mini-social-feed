import { Ad, AdScore, CategoryPreference, UserBehavior } from '../types';

/**
 * Personalization Algorithm
 * Scores ads based on user behavior and preferences
 */
export class AdPersonalizationEngine {
  /**
   * Calculate a personalized score for an ad based on user behavior
   */
  static scoreAd(
    ad: Ad,
    categoryPreferences: CategoryPreference[],
    behavior: UserBehavior
  ): AdScore {
    let score = 0;
    const reasons: string[] = [];

    // 1. Category matching (0-50 points)
    const categoryPref = categoryPreferences.find(p => p.category === ad.category);
    if (categoryPref) {
      const categoryScore = (categoryPref.score / 100) * 50;
      score += categoryScore;
      if (categoryScore > 25) {
        reasons.push(`High interest in ${ad.category}`);
      }
    }

    // 2. Priority weight (0-20 points)
    const priorityScore = (ad.priority / 10) * 20;
    score += priorityScore;

    // 3. Previous interactions (0-30 points)
    const previousViews = behavior.views.filter(v => v.adId === ad.id).length;
    const previousClicks = behavior.clicks.filter(c => c.adId === ad.id).length;

    if (previousClicks > 0) {
      // If user clicked before, they're interested but already engaged
      score -= 10; // Slight penalty to show variety
      reasons.push('Previously clicked');
    } else if (previousViews > 2) {
      // If viewed multiple times but no click, might not be interested
      score -= 5;
      reasons.push('Previously viewed');
    } else if (previousViews === 0) {
      // New ad gets a freshness bonus
      score += 15;
      reasons.push('New to you');
    }

    // 4. Tag matching (bonus points)
    const viewedTags = new Set(
      behavior.views
        .map(v => this.getAdById(v.adId)?.tags || [])
        .flat()
    );
    
    const matchingTags = ad.tags.filter(tag => viewedTags.has(tag));
    if (matchingTags.length > 0) {
      score += matchingTags.length * 3;
      reasons.push(`Matches interests: ${matchingTags.slice(0, 2).join(', ')}`);
    }

    // 5. Recency factor - prefer showing ads user hasn't seen recently
    const recentViews = behavior.views.filter(v => {
      const hoursSince = (Date.now() - v.timestamp) / (1000 * 60 * 60);
      return v.adId === ad.id && hoursSince < 24;
    });
    
    if (recentViews.length > 0) {
      score -= recentViews.length * 10;
      reasons.push('Shown recently');
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));

    return {
      ad,
      score: Math.round(score),
      reasons
    };
  }

  /**
   * Get personalized ad recommendations
   */
  static getPersonalizedAds(
    ads: Ad[],
    categoryPreferences: CategoryPreference[],
    behavior: UserBehavior,
    limit: number = 10
  ): AdScore[] {
    // Score all ads
    const scoredAds = ads.map(ad => 
      this.scoreAd(ad, categoryPreferences, behavior)
    );

    // Sort by score and apply diversity
    const sorted = scoredAds.sort((a, b) => b.score - a.score);

    // Apply diversity - don't show too many ads from same category
    const diversified = this.applyDiversity(sorted, limit);

    return diversified;
  }

  /**
   * Apply diversity to ensure varied ad categories
   */
  private static applyDiversity(scoredAds: AdScore[], limit: number): AdScore[] {
    const result: AdScore[] = [];
    const categoryCount: Record<string, number> = {};
    const maxPerCategory = Math.ceil(limit / 3); // Max 1/3 of ads from same category

    for (const scoredAd of scoredAds) {
      if (result.length >= limit) break;

      const category = scoredAd.ad.category;
      const count = categoryCount[category] || 0;

      if (count < maxPerCategory) {
        result.push(scoredAd);
        categoryCount[category] = count + 1;
      }
    }

    // If we don't have enough ads, fill with remaining ones
    if (result.length < limit) {
      for (const scoredAd of scoredAds) {
        if (result.length >= limit) break;
        if (!result.find(r => r.ad.id === scoredAd.ad.id)) {
          result.push(scoredAd);
        }
      }
    }

    return result;
  }

  /**
   * Get ads by category
   */
  static getAdsByCategory(ads: Ad[], category: string): Ad[] {
    return ads.filter(ad => ad.category === category);
  }

  /**
   * Simple helper to simulate getting ad by ID
   */
  private static adCache: Ad[] = [];
  
  static setAdCache(ads: Ad[]) {
    this.adCache = ads;
  }

  private static getAdById(id: string): Ad | undefined {
    return this.adCache.find(ad => ad.id === id);
  }

  /**
   * Get trending ads (high priority + recent)
   */
  static getTrendingAds(ads: Ad[], limit: number = 5): Ad[] {
    return ads
      .sort((a, b) => b.priority - a.priority)
      .slice(0, limit);
  }

  /**
   * Get cold start recommendations for new users
   */
  static getColdStartAds(ads: Ad[], limit: number = 10): Ad[] {
    // For new users, show diverse high-priority ads
    const diverse: Ad[] = [];
    const categories = new Set<string>();

    const sortedByPriority = [...ads].sort((a, b) => b.priority - a.priority);

    for (const ad of sortedByPriority) {
      if (diverse.length >= limit) break;
      if (!categories.has(ad.category) || diverse.length > limit / 2) {
        diverse.push(ad);
        categories.add(ad.category);
      }
    }

    return diverse;
  }
}
