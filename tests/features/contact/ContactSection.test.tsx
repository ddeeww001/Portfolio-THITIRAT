import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ContactSection } from '../../src/frontend/components/ContactSection';
import { profileDatabase } from '../../src/data/profileData';

describe('ContactSection Component (Frontend Test Suite)', () => {
  it('renders contact heading and direct email/phone buttons', () => {
    render(<ContactSection />);
    expect(screen.getByText(/GET IN TOUCH \./i)).toBeInTheDocument();
    expect(screen.getByText(profileDatabase.email)).toBeInTheDocument();
    expect(screen.getByText(profileDatabase.phone)).toBeInTheDocument();
  });

  it('copies email to clipboard and triggers copied toast feedback', () => {
    vi.useFakeTimers();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<ContactSection />);
    const copyBtn = screen.getByRole('button', { name: /COPY EMAIL/i });
    fireEvent.click(copyBtn);

    expect(writeTextMock).toHaveBeenCalledWith(profileDatabase.email);
    expect(screen.getByText(/COPIED TO CLIPBOARD/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/COPY EMAIL/i)).toBeInTheDocument();
    vi.useRealTimers();
  });
});
