import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ShowExperience from '../../../src/features/projects/showExperience';

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

  it('shows the newest project as the Featured card, the rest as grid cards', () => {
    const { container } = render(<ShowExperience />);
    const featured = container.querySelectorAll('.project-card--featured');
    expect(featured).toHaveLength(1);
    expect(featured[0].textContent).toMatch(/CM CRAFT MAP/);
    expect(container.querySelectorAll('.project-card--vertical').length).toBeGreaterThan(0);
  });

  it('lists the CM Craft Map project with its UX/UI role and live link', () => {
    render(<ShowExperience />);
    expect(screen.getByText(/CM CRAFT MAP/)).toBeInTheDocument();
    expect(screen.getAllByText('UX/UI Designer').length).toBeGreaterThan(0);
    const live = screen.getAllByRole('link', { name: /LIVE/ }).find((a) => a.getAttribute('href') === 'https://cmcraftmap.camt.cmu.ac.th/');
    expect(live).toBeDefined();
  });

  it('opens and closes project quick view modal (SEE MORE button)', () => {
    render(<ShowExperience />);
    const quickViewButtons = screen.getAllByRole('button', { name: /^SEE MORE$/ });
    expect(quickViewButtons.length).toBeGreaterThan(0);

    fireEvent.click(quickViewButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText(/Close modal/i);
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('card buttons read SEE MORE and LIVE with no arrow icons', () => {
    render(<ShowExperience />);
    const seeMore = screen.getAllByRole('button', { name: 'SEE MORE' });
    expect(seeMore.length).toBeGreaterThan(0);
    for (const b of seeMore) expect(b.textContent).toBe('SEE MORE');
    for (const a of screen.getAllByRole('link', { name: 'LIVE' })) expect(a.textContent).toBe('LIVE');
    expect(screen.queryByRole('button', { name: /CASE STUDY/i })).toBeNull();
  });

  it('YOUNG DEV HACKATHON card shows the provided team photo', () => {
    render(<ShowExperience />);
    const img = screen.getAllByRole('img', { name: 'YOUNG DEV HACKATHON' })[0];
    expect(img).toHaveAttribute('src', '/projects/young-dev-hackathon.webp');
  });

  it('SEE MORE modal shows the project screenshots with captions', () => {
    render(<ShowExperience />);
    const card = screen.getByText('YOUNG DEV HACKATHON').closest('article')!;
    fireEvent.click(card.querySelector('button')!);
    const dialog = screen.getByRole('dialog');
    const shot = dialog.querySelector('.modal-gallery img');
    expect(shot).toHaveAttribute('src', '/projects/young-dev-hackathon.webp');
    expect(dialog.querySelector('figcaption')?.textContent).toMatch(/team photo/i);
  });
});
