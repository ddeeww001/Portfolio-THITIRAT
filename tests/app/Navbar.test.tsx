import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Navbar } from '../../src/App';

describe('Navbar Component (Frontend Test Suite)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders brand logo and navigation buttons', () => {
    render(<Navbar />);
    expect(screen.getByText(/THITIRAT/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Home/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Certificates' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Contact' })).toBeInTheDocument();
  });

  it('toggles sound active state when clicking sound button', () => {
    render(<Navbar />);
    const soundButtons = screen.getAllByTitle(/Toggle UI sound feedback/i);
    expect(soundButtons.length).toBeGreaterThan(0);

    const desktopSoundBtn = soundButtons[0];
    expect(desktopSoundBtn).toHaveTextContent(/MUTED/i);

    fireEvent.click(desktopSoundBtn);
    expect(desktopSoundBtn).toHaveTextContent(/AUDIO ON/i);

    fireEvent.click(desktopSoundBtn);
    expect(desktopSoundBtn).toHaveTextContent(/MUTED/i);
  });

  it('opens and closes mobile dropdown menu on button click', () => {
    render(<Navbar />);
    const dropdownTrigger = screen.getByLabelText(/Toggle navigation menu/i);
    expect(dropdownTrigger).toBeInTheDocument();

    // Open dropdown
    fireEvent.click(dropdownTrigger);
    expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'true');

    // Click an item in dropdown (the second instance of Work)
    const workItems = screen.getAllByText('Work');
    fireEvent.click(workItems[workItems.length - 1]);

    // Should close dropdown
    expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu on Escape key press', () => {
    render(<Navbar />);
    const dropdownTrigger = screen.getByLabelText(/Toggle navigation menu/i);
    fireEvent.click(dropdownTrigger);
    expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(dropdownTrigger).toHaveAttribute('aria-expanded', 'false');
  });
});

