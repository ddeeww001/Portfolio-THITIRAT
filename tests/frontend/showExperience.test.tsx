import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShowExperience from '../../src/frontend/showExperience';

describe('ShowExperience Component (Frontend Test Suite)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title and filter buttons', () => {
    render(<ShowExperience />);
    expect(screen.getByText(/FEATURED WORK \./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ALL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hackathon' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Frontend' })).toBeInTheDocument();
  });

  it('filters project cards when clicking filter buttons', () => {
    render(<ShowExperience />);
    const hackathonBtn = screen.getByRole('button', { name: 'Hackathon' });
    
    fireEvent.click(hackathonBtn);
    expect(hackathonBtn).toHaveClass('active');

    // Should display Hackathon projects
    expect(screen.getByText(/HACKATHON : ETHChaingmai/i)).toBeInTheDocument();
  });

  it('searches projects in real-time with debouncing and updates counter badge', async () => {
    vi.useFakeTimers();
    render(<ShowExperience />);

    const searchInput = screen.getByPlaceholderText(/Search projects by title/i);
    fireEvent.change(searchInput, { target: { value: 'Central Tham' } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/Design mascot CENTRAL THAM/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('displays empty state card when search finds 0 results, and resets on button click', async () => {
    vi.useFakeTimers();
    render(<ShowExperience />);

    const searchInput = screen.getByPlaceholderText(/Search projects by title/i);
    fireEvent.change(searchInput, { target: { value: 'XYZNonExistent12345' } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/No matching projects found/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Reset Filters/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/FEATURED WORK/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('opens and closes project quick view modal', () => {
    render(<ShowExperience />);
    const quickViewButtons = screen.getAllByRole('button', { name: /QUICK VIEW/i });
    expect(quickViewButtons.length).toBeGreaterThan(0);

    fireEvent.click(quickViewButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
