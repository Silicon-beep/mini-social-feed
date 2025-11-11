import React, { useEffect, useRef, useState } from 'react';
import { Ad } from '../types';
import { useBehaviorTracking } from '../context/BehaviorContext';
import './AdCard.css';

interface AdCardProps {
  ad: Ad;
  score?: number;
  reasons?: string[];
  variant?: 'default' | 'compact' | 'featured';
}

export const AdCard: React.FC<AdCardProps> = ({ 
  ad, 
  score, 
  reasons = [],
  variant = 'default'
}) => {
  const { trackView, trackClick } = useBehaviorTracking();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const viewTrackedRef = useRef(false);

  // Track view when ad becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && !viewTrackedRef.current) {
          viewTrackedRef.current = true;
          trackView(ad.id, ad.category, 2);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [ad.id, ad.category, trackView]);

  const handleClick = () => {
    trackClick(ad.id, ad.category);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = `https://via.placeholder.com/400x200/667eea/ffffff?text=${encodeURIComponent(ad.category)}`;
  };

  return (
    <div 
      ref={cardRef}
      className={`ad-card ad-card-${variant} ${isVisible ? 'visible' : ''}`}
      onClick={handleClick}
    >
      <div className="ad-image-container">
        <img 
          src={ad.imageUrl} 
          alt={ad.title}
          onError={handleImageError}
          loading="lazy"
        />
        <div className="ad-category-badge">{ad.category}</div>
        {score !== undefined && (
          <div className="ad-score-badge">
            Score: {score}
          </div>
        )}
      </div>
      
      <div className="ad-content">
        <h3 className="ad-title">{ad.title}</h3>
        <p className="ad-description">{ad.description}</p>
        
        {reasons.length > 0 && (
          <div className="ad-reasons">
            {reasons.slice(0, 2).map((reason, idx) => (
              <span key={idx} className="ad-reason-tag">
                {reason}
              </span>
            ))}
          </div>
        )}
        
        <div className="ad-footer">
          <div className="ad-tags">
            {ad.tags.slice(0, 3).map(tag => (
              <span key={tag} className="ad-tag">#{tag}</span>
            ))}
          </div>
          <button className="ad-cta-button">Learn More →</button>
        </div>
      </div>
    </div>
  );
};
