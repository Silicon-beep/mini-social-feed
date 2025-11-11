import { useState } from 'react';
import { BehaviorProvider } from './context/BehaviorContext';
import { PersonalizedAdFeed } from './components/PersonalizedAdFeed';
import { UserDashboard } from './components/UserDashboard';
import './App.css';

function App() {
  const [showScores, setShowScores] = useState(true);

  return (
    <BehaviorProvider>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="netflix-logo">
              <svg viewBox="0 0 111 30" className="logo-svg">
                <g fill="#E50914">
                  <path d="M105.06233,14.2806261 L110.999156,30 L105.718437,30 L102.374168,20.4056139 L99.0299513,30 L93.7488685,30 L99.6856408,14.2806261 L94.1641191,0 L99.4450775,0 L102.51449,8.95595559 L105.58391,0 L110.864528,0 L105.06233,14.2806261 Z" />
                  <path d="M90.4686475,-0.000191571419 L85.8749649,-0.000191571419 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-0.000191571419 Z" />
                  <path d="M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-0.000191571419 L73.9366266,-0.000191571419 L73.9366266,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z" />
                  <path d="M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-0.000191571419 L66.3436123,-0.000191571419 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z" />
                  <path d="M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-0.000191571419 L50.2183897,-0.000191571419 L50.2183897,4.68741213 L45.3435186,4.68741213 Z" />
                  <path d="M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-0.000191571419 L32.7809542,-0.000191571419 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z" />
                  <path d="M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-0.000191571419 L4.4690224,-0.000191571419 L10.562377,17.0315868 L10.562377,-0.000191571419 L15.2497891,-0.000191571419 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z" />
                </g>
              </svg>
              <span className="platform-badge">Ads Platform</span>
            </div>
            <h1 className="app-title">
              Ad Personalization Engine
            </h1>
            <p className="app-description">
              Internal tool for targeted advertising and audience insights
            </p>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            <UserDashboard />
            
            <div className="controls">
              <label className="toggle-control">
                <input
                  type="checkbox"
                  checked={showScores}
                  onChange={(e) => setShowScores(e.target.checked)}
                />
                <span>Show Personalization Scores</span>
              </label>
            </div>

            <PersonalizedAdFeed limit={12} showScores={showScores} />

            <div className="info-section">
              <h3>Platform Capabilities</h3>
              <div className="info-grid">
                <div className="info-card">
                  <div className="info-icon">�</div>
                  <h4>Real-Time Analytics</h4>
                  <p>Track viewer engagement metrics with millisecond precision using advanced observability patterns</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">🎯</div>
                  <h4>Behavioral Targeting</h4>
                  <p>Multi-signal ML pipeline analyzes viewing patterns to optimize ad relevance and CTR</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">⚡</div>
                  <h4>Dynamic Optimization</h4>
                  <p>Real-time bidding and placement optimization driven by user preference modeling</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">🔒</div>
                  <h4>Privacy-First Design</h4>
                  <p>GDPR and CCPA compliant architecture with client-side preference management</p>
                </div>
              </div>
            </div>

            <div className="tech-stack">
              <h4>Technology Stack</h4>
              <div className="tech-badges">
                <span className="tech-badge">React 18</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">GraphQL</span>
                <span className="tech-badge">Apollo Client</span>
                <span className="tech-badge">Intersection Observer</span>
                <span className="tech-badge">Real-time Analytics</span>
              </div>
            </div>
          </div>
        </main>

        <footer className="app-footer">
          <p>Netflix Ads Platform • Personalization Engine v2.1 • Internal Tool</p>
          <p className="footer-meta">Confidential & Proprietary</p>
        </footer>
      </div>
    </BehaviorProvider>
  );
}

export default App;
