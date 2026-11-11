import { describe, it, expect } from 'vitest';
import { screenshotUrl as buildScreenshotUrl } from '../../../src/features/projects/microlink';

// Tests the real helper used by ProjectThumbnail (previously this file tested its own local copy).
describe('Microlink Screenshot Service Tests', () => {

  it('correctly encodes complex project destination URLs', () => {
    const rawUrl = 'https://www.figma.com/design/f91hiWcRtLAB5SnPPrtv6U/Untitled?node-id=0-1&t=wfEWnCKOQ9U5G10H-1';
    const screenshotUrl = buildScreenshotUrl(rawUrl);

    expect(screenshotUrl).toContain('api.microlink.io');
    expect(screenshotUrl).toContain('screenshot=true');
    expect(screenshotUrl).toContain('embed=screenshot.url');
    expect(screenshotUrl).toContain(encodeURIComponent(rawUrl));
  });

  it('safely handles simple and root domain targets', () => {
    const rawUrl = 'https://github.com/test-user';
    const screenshotUrl = buildScreenshotUrl(rawUrl);

    expect(screenshotUrl).toBe(
      'https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Ftest-user&screenshot=true&embed=screenshot.url'
    );
  });
});
