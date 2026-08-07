import React, { useEffect, useState } from 'react';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        // Fetch User Info
        const userRes = await fetch('https://api.github.com/users/ddeeww001');
        if (!userRes.ok) throw new Error('Failed to fetch GitHub profile');
        const userData = await userRes.json();
        setUser(userData);

        // Fetch Repositories
        const reposRes = await fetch('https://api.github.com/users/ddeeww001/repos?sort=updated&per_page=6');
        if (!reposRes.ok) throw new Error('Failed to fetch GitHub repositories');
        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

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
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              color: 'var(--neon-lime)',
            }}
          >
            💻
          </div>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Live GitHub Activity & Repos
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              AUTHENTIC CODE DATA • GITHUB.COM/DDEEWW001
            </span>
          </div>
        </div>

        <a
          href="https://github.com/ddeeww001"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'rgba(56, 189, 248, 0.1)',
            color: 'var(--neon-lime)',
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

      {loading ? (
        <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          ⚡ Fetching live GitHub statistics for ddeeww001...
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
