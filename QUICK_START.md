# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install & Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

### 2. Test the Personalization
1. **Scroll through ads** - View tracking happens automatically
2. **Click ads you like** - Clicks are weighted 5x more than views
3. **Check your dashboard** - See your interest profile build in real-time
4. **Refresh the page** - Watch ads reorder based on your behavior

### 3. Reset & Repeat
Click "Reset Data" button to clear behavior and start fresh.

---

## 📊 Understanding Your Dashboard

### Stats Cards
- **Ads Viewed**: Number of ads you've seen (50%+ visible)
- **Ads Clicked**: Number of ads you've clicked
- **Total Interactions**: Combined view + click count

### Interest Profile
- **Progress bars**: Show your preference for each category (0-100%)
- **Color coding**: Each category has a unique color
- **Auto-updated**: Recalculates after every interaction

---

## 🎯 How Personalization Works

### View Tracking
When you scroll, ads that are **50% visible** for **2 seconds** are tracked.

### Click Tracking
Every click is instantly recorded and heavily weighted in your profile.

### Score Calculation
Each ad gets a personalized score:
- ✅ Matches your interests → Higher score
- ⭐ High priority/trending → Bonus points
- 🆕 New to you → Freshness bonus
- 🔁 Recently shown → Score penalty
- 🎨 Diverse categories → Variety ensured

---

## 🛠️ Configuration

### Show/Hide Scores
Toggle "Show Personalization Scores" to see how ads are ranked for you.

### Adjust Feed Size
Edit `src/App.tsx`:
```tsx
<PersonalizedAdFeed limit={12} />  // Change to any number
```

### Modify Scoring Weights
Edit `src/utils/personalizationEngine.ts`:
```typescript
const categoryScore = (categoryPref.score / 100) * 50;  // Adjust 50
const priorityScore = (ad.priority / 10) * 20;          // Adjust 20
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app component |
| `src/context/BehaviorContext.tsx` | Behavior tracking logic |
| `src/utils/personalizationEngine.ts` | Scoring algorithm |
| `src/components/AdCard.tsx` | Individual ad display |
| `src/components/PersonalizedAdFeed.tsx` | Ad feed component |
| `src/data/mockAds.ts` | Sample ad data |

---

## 🎨 Add Your Own Ads

Edit `src/data/mockAds.ts`:

```typescript
{
  id: 'ad-custom',
  title: 'Your Ad Title',
  description: 'Your ad description',
  imageUrl: 'https://your-image-url.com/image.jpg',
  category: 'technology',  // Pick from defined categories
  tags: ['tag1', 'tag2'],
  targetAudience: ['audience-segment'],
  clickUrl: 'https://your-landing-page.com',
  priority: 8  // 1-10, higher = more important
}
```

---

## 🔗 GraphQL Integration (Optional)

### Setup Backend

1. Create `.env` file:
```bash
VITE_GRAPHQL_ENDPOINT=http://your-api.com/graphql
```

2. Implement resolvers using `schema.graphql`

3. Uncomment GraphQL hooks in `src/graphql/hooks.ts`

4. Use hooks in components:
```typescript
const { data } = usePersonalizedAds({ userId: 'user-123', limit: 10 });
```

---

## 💡 Tips & Tricks

### Testing Different Scenarios

**New User (Cold Start)**
```bash
localStorage.clear()
# Refresh page → See diverse, high-priority ads
```

**Power User**
```bash
# Click 10+ ads from same category
# Refresh → See category-specific recommendations
```

**Variety Seeker**
```bash
# Click ads from different categories
# Refresh → See diverse, balanced recommendations
```

### Debugging

**View Behavior Data**
```javascript
// In browser console
JSON.parse(localStorage.getItem('ad_user_behavior'))
```

**Check Current Preferences**
```javascript
// In React DevTools
BehaviorContext → getCategoryPreferences()
```

---

## 🎓 Learning Resources

- **Intersection Observer**: [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- **React Context**: [React Docs](https://react.dev/reference/react/useContext)
- **TypeScript**: [TS Handbook](https://www.typescriptlang.org/docs/)
- **GraphQL**: [GraphQL.org](https://graphql.org/learn/)

---

## 📞 Need Help?

- Check `TECHNICAL_DOCS.md` for detailed documentation
- Review `README.md` for full project overview
- Inspect code comments for inline explanations
- Open an issue on GitHub

---

## 🎉 Have Fun!

Experiment with the algorithm, add your own ads, and see how personalization changes your experience. This is a learning project - feel free to break things and rebuild!
