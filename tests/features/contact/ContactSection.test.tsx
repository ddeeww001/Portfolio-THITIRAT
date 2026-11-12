import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactSection } from '../../../src/features/contact/ContactSection';
import { profileDatabase } from '../../../src/features/profile/profileData';
import { PUBLIC_PROFILE } from '../../../src/config/profile';

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
    expect(screen.getByRole('link', { name: 'Open Line' })).toHaveAttribute(
      'href',
      `https://line.me/ti/p/~${encodeURIComponent(PUBLIC_PROFILE.lineId)}`,
    );
  });

  it('shows the GitHub username as text (allowed public info)', () => {
    render(<ContactSection />);
    const gh = profileDatabase.socials.find((s) => s.label === 'GitHub')!;
    expect(screen.getByText(gh.value)).toBeInTheDocument();
  });

  it('has no copy-email button (removed — the email icon is enough)', () => {
    render(<ContactSection />);
    expect(screen.queryByRole('button', { name: /Copy email/i })).toBeNull();
    expect(screen.queryByText(/COPIED TO CLIPBOARD/i)).toBeNull();
  });
});
