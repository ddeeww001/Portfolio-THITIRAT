import React, { useEffect, useState } from 'react';
import { playClickSound, playHoverSound } from './SoundEffects';

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

export const GitHubSection: React.FC = () => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [justRefreshed, setJustRefreshed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);
      const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || 'ddeeww001';

      // Fetch User Info
      const userRes = await fetch(`https://api.github.com/users/${githubUsername}`);
      if (!userRes.ok) throw new Error('Failed to fetch GitHub profile');
      const userData = await userRes.json();
      setUser(userData);

      // Fetch Repositories
      const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
      if (!reposRes.ok) throw new Error('Failed to fetch GitHub repositories');
      const reposData = await reposRes.json();
      setRepos(reposData);

      setJustRefreshed(true);
      setTimeout(() => setJustRefreshed(false), 2500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const handleManualRefresh = () => {
    playClickSound();
    setIsRefreshing(true);
    fetchGitHubData();
  };

  return (
    <div
      style={{
        background: 'var(--trionn-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '36px',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)', margin: 0 }}>
                Live GitHub Activity & Repos
              </h3>
              {justRefreshed && (
                <span style={{ fontSize: '0.72rem', color: '#00ff88', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  ✓ UPDATED
                </span>
              )}
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              AUTHENTIC CODE DATA • GITHUB.COM/DDEEWW001
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleManualRefresh}
            onMouseEnter={playHoverSound}
            disabled={loading}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.3s ease',
            }}
            title="Refresh latest GitHub data"
          >
            <span style={{ display: 'inline-block', transform: isRefreshing ? 'rotate(360deg)' : 'none', transition: 'transform 0.6s ease' }}>
              ⟳
            </span>
            <span>{isRefreshing ? 'REFRESHING...' : 'REFRESH'}</span>
          </button>

          <a
            href="https://github.com/ddeeww001"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid var(--border-glow)',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
            }}
            className="interactive-hover"
          >
            VIEW GITHUB PROFILE ↗
          </a>
        </div>
      </div>

      {loading ? (
        <div>
          {/* Skeleton Stats Summary */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="skeleton-box"
                style={{
                  height: '80px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              />
            ))}
          </div>

          {/* Skeleton Repositories Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
              gap: '16px',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="skeleton-box"
                style={{
                  height: '140px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              />
            ))}
          </div>
        </div>
      ) : error ? (
        <div style={{ padding: '20px', background: 'rgba(255, 99, 99, 0.1)', border: '1px solid #ff6363', borderRadius: 'var(--radius-md)', color: '#ff8888', fontSize: '0.9rem' }}>
          Unable to load live GitHub data: {error}. You can view the profile directly at{' '}
          <a href="https://github.com/ddeeww001" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
            github.com/ddeeww001
          </a>.
        </div>
      ) : (
        <>
          {/* User Stats Summary */}
          {user && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neon-lime)', fontFamily: 'var(--font-mono)' }}>
                  {user.public_repos}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Public Repos</div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neon-purple)', fontFamily: 'var(--font-mono)' }}>
                  {user.followers}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>Followers</div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {new Date(user.created_at).getFullYear()}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>GitHub Member Since</div>
              </div>
            </div>
          )}

          {/* Repos Grid */}
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
            Recent Public Repositories
          </h4>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
                className="interactive-hover"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h5 style={{ fontSize: '1rem', color: 'var(--neon-lime)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {repo.name}
                    </h5>
                    {repo.fork && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                        Fork
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '16px' }}>
                    {repo.description || 'Public GitHub project repository.'}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  <span>{repo.language ? `● ${repo.language}` : 'Code'}</span>
                  <span>★ {repo.stargazers_count}</span>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
