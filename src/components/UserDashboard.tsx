import React from 'react';
import { useBehaviorTracking } from '../context/BehaviorContext';
import { AdCategory } from '../types';
import './UserDashboard.css';

export const UserDashboard: React.FC = () => {
  const { behavior, getCategoryPreferences, clearBehavior } = useBehaviorTracking();
  const preferences = getCategoryPreferences();

  const totalInteractions = behavior.views.length + behavior.clicks.length;

  const getCategoryColor = (category: AdCategory): string => {
    const colors: Record<AdCategory, string> = {
      technology: '#E50914',
      fashion: '#ff6b6b',
      food: '#ee5a6f',
      travel: '#f77f00',
      gaming: '#d62828',
      fitness: '#e63946',
      entertainment: '#E50914',
      education: '#c1121f'
    };
    return colors[category];
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h3>Your Activity Dashboard</h3>
        <button onClick={clearBehavior} className="clear-button">
          Reset Data
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{behavior.views.length}</div>
          <div className="stat-label">Ads Viewed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{behavior.clicks.length}</div>
          <div className="stat-label">Ads Clicked</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalInteractions}</div>
          <div className="stat-label">Total Interactions</div>
        </div>
      </div>

      {preferences.length > 0 && (
        <div className="preferences-section">
          <h4>Your Interest Profile</h4>
          <div className="preferences-list">
            {preferences.slice(0, 8).map(pref => (
              <div key={pref.category} className="preference-item">
                <div className="preference-header">
                  <span className="preference-name">{pref.category}</span>
                  <span className="preference-score">{pref.score}%</span>
                </div>
                <div className="preference-bar">
                  <div 
                    className="preference-fill"
                    style={{ 
                      width: `${pref.score}%`,
                      backgroundColor: getCategoryColor(pref.category)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalInteractions === 0 && (
        <div className="empty-state">
          <p>Start interacting with ads to build your personalized profile!</p>
        </div>
      )}
    </div>
  );
};
