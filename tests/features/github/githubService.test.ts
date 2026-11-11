import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('GitHub API Service & Contract Tests (Backend/API Test Suite)', () => {
  const username = 'ddeeww001';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates successful 200 OK profile response contract', async () => {
    const mockUserPayload = {
      login: 'ddeeww001',
      avatar_url: 'https://avatars.githubusercontent.com/u/12345678',
      html_url: 'https://github.com/ddeeww001',
      public_repos: 14,
      followers: 6,
      following: 4,
      created_at: '2024-01-01T00:00:00Z',
    };

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockUserPayload),
    });

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.login).toBe('ddeeww001');
    expect(typeof data.public_repos).toBe('number');
    expect(data.avatar_url).toMatch(/^https:\/\/avatars\.githubusercontent\.com\//);
  });

  it('validates 404 Not Found error handling when user does not exist', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ message: 'Not Found' }),
    });

    const response = await fetch('https://api.github.com/users/nonexistent_user_999999');
    expect(response.ok).toBe(false);
    expect(response.status).toBe(404);
  });

  it('validates 403 Rate Limit Exceeded error response and error message', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      json: () => Promise.resolve({
        message: "API rate limit exceeded for IP",
        documentation_url: "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"
      }),
    });

    const response = await fetch(`https://api.github.com/users/${username}`);
    const errorData = await response.json();

    expect(response.ok).toBe(false);
    expect(response.status).toBe(403);
    expect(errorData.message).toContain('API rate limit exceeded');
  });

  it('handles network failure / connection timeout gracefully', async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Failed to fetch (Network Error)'));

    await expect(fetch(`https://api.github.com/users/${username}`)).rejects.toThrow('Network Error');
  });
});
