import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Preloader } from '../../src/frontend/components/Preloader';

describe('Preloader Splash Screen (Frontend Test Suite)', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders preloader brand and tech stack badges', () => {
    render(<Preloader minimumDuration={1000} />);
    expect(screen.getByText(/THITIRAT SIRISAWAD/i)).toBeInTheDocument();
    expect(screen.getByText(/REACT 19/i)).toBeInTheDocument();
    expect(screen.getByText(/TYPESCRIPT/i)).toBeInTheDocument();
  });

  it('increments progress and calls onComplete after completion', async () => {
    const onCompleteMock = vi.fn();
    render(<Preloader minimumDuration={500} onComplete={onCompleteMock} isLoading={false} />);

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(onCompleteMock).toHaveBeenCalled();
  });

  it('holds progress at intermediate percentage if isLoading is true', () => {
    const onCompleteMock = vi.fn();
    render(<Preloader minimumDuration={500} onComplete={onCompleteMock} isLoading={true} />);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // onComplete should NOT be called yet because isLoading is still true
    expect(onCompleteMock).not.toHaveBeenCalled();
  });
});
