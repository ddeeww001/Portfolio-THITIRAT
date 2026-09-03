import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Preloader } from '../../src/frontend/components/Preloader';

describe('Minimal Ring Preloader Component (Frontend Test Suite)', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders minimal spinning ring loader with accessible status role', () => {
    const { container } = render(<Preloader minimumDuration={300} />);
    expect(screen.getByRole('status', { name: /Loading Page/i })).toBeInTheDocument();
    expect(container.querySelector('.minimal-spinner-ring')).toBeInTheDocument();
    expect(container.querySelector('.minimal-spinner-ring-inner')).toBeInTheDocument();
  });

  it('fades out and calls onComplete when minimumDuration passes and isLoading is false', async () => {
    const onCompleteMock = vi.fn();
    render(<Preloader minimumDuration={300} onComplete={onCompleteMock} isLoading={false} />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(onCompleteMock).toHaveBeenCalled();
  });

  it('keeps spinning ring active while isLoading is true', () => {
    const onCompleteMock = vi.fn();
    render(<Preloader minimumDuration={300} onComplete={onCompleteMock} isLoading={true} />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(onCompleteMock).not.toHaveBeenCalled();
    expect(screen.getByRole('status', { name: /Loading Page/i })).toBeInTheDocument();
  });
});
