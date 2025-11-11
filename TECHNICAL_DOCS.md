# Ad Personalization Engine - Technical Documentation

## Overview
This document provides detailed technical information about the Ad Personalization Engine implementation.

## Architecture

### Component Hierarchy
```
App
├── BehaviorProvider (Context)
│   └── PersonalizedAdFeed
│       └── AdCard (multiple instances)
└── UserDashboard
```

## Core Components

### 1. BehaviorContext (`src/context/BehaviorContext.tsx`)

**Purpose**: Centralized state management for user behavior tracking.

**Features**:
- Tracks view events (when ads become visible)
- Tracks click events
- Persists data to localStorage
- Calculates category preferences in real-time
- Applies recency decay to older interactions

**Key Methods**:
```typescript
trackView(adId: string, category: AdCategory, duration?: number)
trackClick(adId: string, category: AdCategory)
getCategoryPreferences(): CategoryPreference[]
clearBehavior(): void
```

**Algorithm Details**:
- **View Scoring**: `1 point × (duration/5)`
- **Click Scoring**: `5 points`
- **Recency Decay**: `Math.exp(-ageInDays / 7)` (exponential decay over 7 days)
- **Normalization**: Scores normalized to 0-100 scale

### 2. PersonalizationEngine (`src/utils/personalizationEngine.ts`)

**Purpose**: Core algorithm for scoring and ranking ads.

**Scoring Breakdown**:

#### Category Matching (0-50 points)
```typescript
categoryScore = (userPreferenceScore / 100) * 50
```
- Maximum 50 points for perfect category match
- Proportional to user's interest in that category

#### Priority Weight (0-20 points)
```typescript
priorityScore = (adPriority / 10) * 20
```
- Ensures important/promoted ads get visibility
- Based on business priorities (1-10 scale)

#### Previous Interactions (±30 points)
```typescript
if (previousClicks > 0) score -= 10;
else if (previousViews > 2) score -= 5;
else if (previousViews === 0) score += 15;
```
- **Clicked before**: -10 points (reduce repetition)
- **Many views, no clicks**: -5 points (likely not interested)
- **Never seen**: +15 points (freshness bonus)

#### Tag Matching (bonus)
```typescript
matchingTags * 3
```
- Each matching tag adds 3 points
- Helps find similar content

#### Recency Factor (penalty)
```typescript
if (viewedInLast24Hours) score -= viewCount * 10
```
- Prevents showing same ads repeatedly
- Ensures variety

#### Diversity Algorithm
```typescript
maxPerCategory = Math.ceil(limit / 3)
```
- Limits category dominance
- Ensures balanced ad mix
- Prevents filter bubbles

### 3. AdCard Component (`src/components/AdCard.tsx`)

**Features**:
- **Intersection Observer**: Automatic view tracking when 50% visible
- **Lazy Loading**: Images loaded on demand
- **Visual Feedback**: Hover effects, animations
- **Score Display**: Optional personalization score badge
- **Reason Tags**: Shows why ad was recommended

**View Tracking**:
```typescript
new IntersectionObserver(callback, { threshold: 0.5 })
```
- Triggers when ad is 50% visible
- Only tracks once per ad instance
- Records 2-second duration by default

### 4. PersonalizedAdFeed (`src/components/PersonalizedAdFeed.tsx`)

**Features**:
- **Cold Start Handling**: Shows diverse, high-priority ads for new users
- **Memoization**: Optimized re-renders with useMemo
- **Dynamic Limit**: Configurable number of ads
- **Score Toggle**: Optional display of scores

**Decision Logic**:
```typescript
if (hasInteractions) {
  return personalizedAds();
} else {
  return coldStartAds();
}
```

### 5. UserDashboard (`src/components/UserDashboard.tsx`)

**Visualizations**:
- Total views, clicks, interactions
- Category preference bars with color coding
- Progress bars showing interest levels
- Clear/reset functionality

## Data Flow

### View Tracking Flow
```
1. AdCard renders
2. IntersectionObserver detects visibility
3. trackView() called in BehaviorContext
4. ViewEvent created with timestamp
5. Saved to state and localStorage
6. Preferences recalculated
7. PersonalizedAdFeed re-renders with new scores
```

### Click Tracking Flow
```
1. User clicks AdCard
2. trackClick() called in BehaviorContext
3. ClickEvent created with timestamp
4. Saved to state and localStorage
5. Preferences recalculated (clicks weighted 5x views)
6. Feed updates on next render
```

## Performance Optimizations

### 1. Memoization
```typescript
const personalizedAds = useMemo(() => {
  // Expensive calculation only runs when dependencies change
}, [behavior, getCategoryPreferences, limit]);
```

### 2. Lazy Loading
```html
<img loading="lazy" />
```

### 3. Intersection Observer
- More efficient than scroll listeners
- Built-in browser optimization
- Only tracks when needed

### 4. LocalStorage Caching
- Reduces API calls
- Instant load on return visits
- Offline capability

## GraphQL Integration (Optional)

### Schema Highlights
- **Queries**: `personalizedAds`, `adsByCategory`, `userBehavior`, `trendingAds`
- **Mutations**: `trackAdView`, `trackAdClick`, `clearUserBehavior`
- **Subscriptions**: Real-time ad updates (optional)

### Backend Requirements
To implement a GraphQL backend:

1. **Database Schema**:
   - Users table (id, profile)
   - Ads table (all ad fields)
   - ViewEvents table (userId, adId, timestamp, duration)
   - ClickEvents table (userId, adId, timestamp)

2. **Resolvers**:
```typescript
Query: {
  personalizedAds: (_, { userId, limit, categories }) => {
    const behavior = getUserBehavior(userId);
    const preferences = calculatePreferences(behavior);
    const ads = getAds(categories);
    return AdPersonalizationEngine.getPersonalizedAds(ads, preferences, behavior, limit);
  }
}
```

3. **Caching Strategy**:
   - Cache user preferences for 5 minutes
   - Invalidate on new interactions
   - Use DataLoader for batch loading

## Customization Guide

### Adding New Ad Categories

1. Update type definition:
```typescript
// src/types/index.ts
export type AdCategory = 'technology' | 'fashion' | 'your-category';
```

2. Add color mapping:
```typescript
// src/components/UserDashboard.tsx
const colors: Record<AdCategory, string> = {
  'your-category': '#hexcolor'
};
```

3. Add mock ads:
```typescript
// src/data/mockAds.ts
{
  id: 'ad-new',
  category: 'your-category',
  // ... other fields
}
```

### Adjusting Scoring Weights

Edit `src/utils/personalizationEngine.ts`:

```typescript
static scoreAd(ad, preferences, behavior) {
  // Adjust these weights:
  const CATEGORY_WEIGHT = 50;    // Current: 50
  const PRIORITY_WEIGHT = 20;    // Current: 20
  const FRESHNESS_BONUS = 15;    // Current: 15
  const TAG_WEIGHT = 3;          // Current: 3
  const CLICK_PENALTY = 10;      // Current: 10
}
```

### Changing View Duration Threshold

Edit `src/components/AdCard.tsx`:

```typescript
trackView(ad.id, ad.category, 2);  // Change duration (seconds)
```

And Intersection Observer threshold:

```typescript
new IntersectionObserver(callback, {
  threshold: 0.5  // Change to 0.7 for 70% visible, etc.
});
```

## Testing Strategies

### Manual Testing
1. **Cold Start**: Clear localStorage, refresh page
2. **View Tracking**: Scroll through ads, check dashboard
3. **Click Tracking**: Click ads, verify increased preference
4. **Persistence**: Refresh page, verify behavior persists
5. **Reset**: Test clear behavior button

### Automated Testing (Future)
```typescript
// Example test structure
describe('PersonalizationEngine', () => {
  test('scores high-priority ads higher', () => {
    const ad1 = { ...mockAd, priority: 10 };
    const ad2 = { ...mockAd, priority: 5 };
    const score1 = engine.scoreAd(ad1, [], emptyBehavior);
    const score2 = engine.scoreAd(ad2, [], emptyBehavior);
    expect(score1.score).toBeGreaterThan(score2.score);
  });
});
```

## Browser Compatibility

### Required Features
- **Intersection Observer**: Chrome 51+, Firefox 55+, Safari 12.1+
- **LocalStorage**: All modern browsers
- **CSS Grid**: All modern browsers
- **ES6+**: Transpiled by Vite

### Polyfills
Not currently included but can add:
```bash
npm install intersection-observer
```

## Performance Metrics

### Target Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization Opportunities
1. Add React.memo to AdCard
2. Implement virtual scrolling for large ad lists
3. Use Web Workers for scoring calculations
4. Implement service worker for offline support
5. Add image optimization/CDN

## Security Considerations

### Current Implementation
- Client-side only (demo)
- No PII collected
- Data stays in browser

### Production Recommendations
1. **Authentication**: Add user authentication
2. **Rate Limiting**: Prevent abuse of tracking
3. **Data Privacy**: Comply with GDPR/CCPA
4. **Encryption**: Encrypt sensitive data
5. **Validation**: Validate all inputs
6. **CSP**: Add Content Security Policy headers

## Future Enhancements

### Potential Features
1. **A/B Testing**: Test different algorithms
2. **Machine Learning**: Train models on interaction data
3. **Collaborative Filtering**: Use similar users' preferences
4. **Contextual Ads**: Time-of-day, location-based
5. **Ad Fatigue Detection**: Automatically rotate ads
6. **Conversion Tracking**: Track post-click actions
7. **Real-time Bidding**: Integrate with ad exchanges
8. **Analytics Dashboard**: Detailed metrics and insights

## Troubleshooting

### Common Issues

#### Ads not updating after interaction
- Check localStorage for saved behavior
- Verify BehaviorContext is wrapping App
- Check console for errors

#### View tracking not working
- Verify Intersection Observer support
- Check threshold settings
- Ensure ads are in viewport

#### Scores seem incorrect
- Review scoring weights in personalizationEngine.ts
- Check category preference calculation
- Verify behavior data structure

## Additional Resources

- [React Context API](https://react.dev/reference/react/useContext)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
