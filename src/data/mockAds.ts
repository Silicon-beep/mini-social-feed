import { Ad } from '../types';

// Mock ad data for various categories
export const mockAds: Ad[] = [
  {
    id: 'ad-1',
    title: 'Latest Smartphone - 50% Off',
    description: 'Get the newest flagship phone with cutting-edge technology',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    category: 'technology',
    tags: ['smartphone', 'electronics', 'gadgets', 'mobile'],
    targetAudience: ['tech-enthusiasts', 'early-adopters'],
    clickUrl: '#',
    priority: 8
  },
  {
    id: 'ad-2',
    title: 'Summer Fashion Collection',
    description: 'Trendy outfits for the perfect summer look',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
    category: 'fashion',
    tags: ['clothing', 'style', 'summer', 'apparel'],
    targetAudience: ['fashion-lovers', 'young-adults'],
    clickUrl: '#',
    priority: 7
  },
  {
    id: 'ad-3',
    title: 'Gourmet Meal Kit Delivery',
    description: 'Chef-prepared ingredients delivered to your door',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    category: 'food',
    tags: ['cooking', 'delivery', 'healthy', 'organic'],
    targetAudience: ['foodies', 'busy-professionals'],
    clickUrl: '#',
    priority: 6
  },
  {
    id: 'ad-4',
    title: 'Exotic Beach Getaway',
    description: 'Escape to paradise - Book your dream vacation now',
    imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400',
    category: 'travel',
    tags: ['vacation', 'beach', 'resort', 'adventure'],
    targetAudience: ['travelers', 'vacation-seekers'],
    clickUrl: '#',
    priority: 9
  },
  {
    id: 'ad-5',
    title: 'Epic Gaming Bundle',
    description: 'Top-rated games at unbeatable prices',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    category: 'gaming',
    tags: ['video-games', 'entertainment', 'console', 'pc'],
    targetAudience: ['gamers', 'tech-enthusiasts'],
    clickUrl: '#',
    priority: 8
  },
  {
    id: 'ad-6',
    title: 'Premium Fitness Membership',
    description: 'Transform your body with expert trainers',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    category: 'fitness',
    tags: ['health', 'gym', 'workout', 'wellness'],
    targetAudience: ['fitness-enthusiasts', 'health-conscious'],
    clickUrl: '#',
    priority: 7
  },
  {
    id: 'ad-7',
    title: 'Streaming Service - Free Trial',
    description: 'Watch unlimited movies and shows',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    category: 'entertainment',
    tags: ['streaming', 'movies', 'tv-shows', 'subscription'],
    targetAudience: ['entertainment-lovers', 'binge-watchers'],
    clickUrl: '#',
    priority: 8
  },
  {
    id: 'ad-8',
    title: 'Online Learning Platform',
    description: 'Master new skills with expert-led courses',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
    category: 'education',
    tags: ['learning', 'courses', 'skills', 'certification'],
    targetAudience: ['students', 'professionals', 'lifelong-learners'],
    clickUrl: '#',
    priority: 6
  },
  {
    id: 'ad-9',
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB lighting and lightning-fast response',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    category: 'technology',
    tags: ['gaming', 'peripherals', 'rgb', 'mechanical'],
    targetAudience: ['gamers', 'tech-enthusiasts'],
    clickUrl: '#',
    priority: 7
  },
  {
    id: 'ad-10',
    title: 'Designer Sneakers Collection',
    description: 'Limited edition sneakers from top brands',
    imageUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
    category: 'fashion',
    tags: ['shoes', 'sneakers', 'limited-edition', 'streetwear'],
    targetAudience: ['sneakerheads', 'fashion-lovers'],
    clickUrl: '#',
    priority: 8
  },
  {
    id: 'ad-11',
    title: 'Italian Pasta Making Kit',
    description: 'Create authentic Italian pasta at home',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    category: 'food',
    tags: ['cooking', 'italian', 'diy', 'gourmet'],
    targetAudience: ['cooking-enthusiasts', 'foodies'],
    clickUrl: '#',
    priority: 5
  },
  {
    id: 'ad-12',
    title: 'Adventure Hiking Tours',
    description: 'Explore breathtaking mountain trails',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
    category: 'travel',
    tags: ['hiking', 'adventure', 'nature', 'outdoor'],
    targetAudience: ['adventure-seekers', 'nature-lovers'],
    clickUrl: '#',
    priority: 7
  },
  {
    id: 'ad-13',
    title: 'VR Gaming Headset',
    description: 'Immerse yourself in virtual reality',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400',
    category: 'gaming',
    tags: ['vr', 'virtual-reality', 'immersive', 'technology'],
    targetAudience: ['gamers', 'tech-enthusiasts', 'early-adopters'],
    clickUrl: '#',
    priority: 9
  },
  {
    id: 'ad-14',
    title: 'Smart Fitness Watch',
    description: 'Track your health and fitness goals',
    imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400',
    category: 'fitness',
    tags: ['wearable', 'health', 'tracking', 'smartwatch'],
    targetAudience: ['fitness-enthusiasts', 'tech-enthusiasts'],
    clickUrl: '#',
    priority: 8
  },
  {
    id: 'ad-15',
    title: 'Concert Tickets Sale',
    description: 'See your favorite artists live',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
    category: 'entertainment',
    tags: ['music', 'concert', 'live', 'events'],
    targetAudience: ['music-lovers', 'entertainment-lovers'],
    clickUrl: '#',
    priority: 7
  }
];
