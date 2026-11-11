import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ContactSection } from '../../../src/features/contact/ContactSection';
import { profileDatabase } from '../../../src/features/profile/profileData';

describe('ContactSection Component (Frontend Test Suite)', () => {
  it('shows contact channels as icons only, without printing private values', () => {
    const { container } = render(<ContactSection />);
    expect(screen.getByText(/GET IN TOUCH \./i)).toBeInTheDocument();

    // Private values must not appear as visible text
    expect(container.textContent).not.toContain(profileDatabase.email);
    expect(container.textContent).not.toContain(profileDatabase.phone);

    // ...but are reachable through icon links
    expect(screen.getByRole('link', { name: 'Send email' })).toHaveAttribute('href', `mailto:${profileDatabase.email}`);
    expect(screen.getByRole('link', { name: 'Call' })).toHaveAttribute('href', 'tel:0000000000');
    expect(screen.getByRole('link', { name: 'Open Instagram' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Facebook' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open Line' })).toHaveAttribute('href', 'https://line.me/ti/p/~test.line');
  });

  it('shows the GitHub username as text (allowed public info)', () => {
    render(<ContactSection />);
    const gh = profileDatabase.socials.find((s) => s.label === 'GitHub')!;
    expect(screen.getByText(gh.value)).toBeInTheDocument();
  });

  it('copies email to clipboard via the icon button and shows feedback', () => {
    vi.useFakeTimers();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    render(<ContactSection />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy email' }));

    expect(writeTextMock).toHaveBeenCalledWith(profileDatabase.email);
    expect(screen.getByText(/COPIED TO CLIPBOARD/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByRole('button', { name: 'Copy email' })).toBeInTheDocument();
    vi.useRealTimers();
  });
});
