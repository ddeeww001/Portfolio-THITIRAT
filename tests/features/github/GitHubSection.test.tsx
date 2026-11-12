import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitHubSection } from '../../../src/features/github/GitHubSection';

describe('GitHubSection Component (Frontend Test Suite)', () => {
  const mockUser = {
    login: 'ddeeww001',
    avatar_url: 'https://avatars.githubusercontent.com/u/123456',
    html_url: 'https://github.com/ddeeww001',
    public_repos: 12,
    followers: 5,
    following: 3,
    created_at: '2024-01-01T00:00:00Z',
  };

  const mockRepos = [
    {
      id: 1,
      name: 'portfolio',
      html_url: 'https://github.com/ddeeww001/portfolio',
      description: 'Modern portfolio showcase',
      language: 'TypeScript',
      stargazers_count: 8,
      updated_at: '2026-03-01T00:00:00Z',
      fork: false,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear(); // GitHub responses are cached for 10 minutes; start each test fresh
  });

  it('a second visit within 10 minutes reuses the cached data (no extra API calls)', async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(url.includes('/repos') ? mockRepos : mockUser) }),
    );
    globalThis.fetch = fetchMock;

    const first = render(<GitHubSection />);
    await waitFor(() => expect(screen.getByText('portfolio')).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(2); // profile + repos
    first.unmount();

    render(<GitHubSection />);
    await waitFor(() => expect(screen.getByText('portfolio')).toBeInTheDocument());
    expect(fetchMock).toHaveBeenCalledTimes(2); // nothing new
  });

  it('renders stats and repositories upon successful API fetch', async () => {
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/repos')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRepos),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });
    });

    render(<GitHubSection />);

    await waitFor(() => {
      expect(screen.getByText('12')).toBeInTheDocument(); // Public Repos
      expect(screen.getByText('portfolio')).toBeInTheDocument(); // Repo name
    });
  });

  it('triggers manual refresh on refresh button click', async () => {
    globalThis.fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/repos')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRepos),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUser),
      });
    });

    render(<GitHubSection />);

    await waitFor(() => {
      expect(screen.getByText('portfolio')).toBeInTheDocument();
    });

    const refreshBtn = screen.getByRole('button', { name: /REFRESH/i });
    fireEvent.click(refreshBtn);

    // REFRESH bypasses the cache: 2 calls on load + 2 more on refresh
    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(4);
    });
  });

  it('displays error state fallback when API fails', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    render(<GitHubSection />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load live GitHub data/i)).toBeInTheDocument();
    });
  });
});
