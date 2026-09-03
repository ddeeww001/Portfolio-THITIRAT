import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GitHubSection } from '../../src/frontend/components/GitHubSection';

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

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalled();
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
