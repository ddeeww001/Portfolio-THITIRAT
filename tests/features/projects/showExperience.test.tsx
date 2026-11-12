import { render, screen, fireEvent, act, within } from '@testing-library/react';
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

  it('shows every project as a wide card (image left, details right), newest first', () => {
    const { container } = render(<ShowExperience />);
    const cards = container.querySelectorAll('.project-card');
    expect(cards.length).toBeGreaterThan(1);
    cards.forEach((card) => expect(card).toHaveClass('project-card--featured'));
    expect(container.querySelectorAll('.project-card--vertical')).toHaveLength(0);
    expect(cards[0].textContent).toMatch(/FRESHMEN GAMES 2026/); // newest: 20 Sep 2026
  });

  it('lists the CM Craft Map project with its UX/UI role and live link', () => {
    render(<ShowExperience />);
    expect(screen.getByText(/CM CRAFT MAP/)).toBeInTheDocument();
    expect(screen.getAllByText('UX/UI Designer').length).toBeGreaterThan(0);
    const live = screen.getAllByRole('link').find((a) => a.getAttribute('href') === 'https://cmcraftmap.camt.cmu.ac.th/');
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

  it('card picture is the link to the project (no LIVE button); SEE MORE has no arrow', () => {
    const { container } = render(<ShowExperience />);
    const seeMore = screen.getAllByRole('button', { name: 'SEE MORE' });
    expect(seeMore.length).toBeGreaterThan(0);
    for (const b of seeMore) expect(b.textContent).toBe('SEE MORE');
    expect(screen.queryByRole('link', { name: 'LIVE' })).toBeNull();
    expect(screen.queryByRole('button', { name: /CASE STUDY/i })).toBeNull();

    const thumbLinks = container.querySelectorAll<HTMLAnchorElement>('a.project-card__thumb--link');
    expect(thumbLinks.length).toBeGreaterThan(0);
    for (const a of thumbLinks) {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
      expect(a.querySelector('img, iframe, .project-card__thumb-hint')).not.toBeNull();
    }
  });

  it('SEE MORE modal: pictures open the project link and there are no link buttons', () => {
    render(<ShowExperience />);
    const card = screen.getByText(/CM CRAFT MAP/).closest('article')!;
    fireEvent.click(within(card).getByRole('button', { name: 'SEE MORE' }));
    const dialog = screen.getByRole('dialog');
    const pictureLinks = dialog.querySelectorAll('.modal-gallery a');
    expect(pictureLinks.length).toBeGreaterThan(0);
    for (const a of pictureLinks) expect(a.getAttribute('href')).toBe('https://cmcraftmap.camt.cmu.ac.th/');
    expect(dialog.querySelector('.modal-link-btn')).toBeNull();
    expect(within(dialog).getAllByRole('button')).toHaveLength(1); // close only
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

  it('Smart Accounting card leads with the Mae Hoi Ngoen School summary; SEE MORE shows Problem → Result', () => {
    render(<ShowExperience />);
    const card = screen.getByRole('heading', { name: /SMART ACCOUNTING AND MANAGEMENT/ }).closest('article')!;
    expect(card.textContent).toMatch(/student-run shop at Mae Hoi Ngoen School/);
    fireEvent.click(within(card).getByRole('button', { name: 'SEE MORE' }));
    const dialog = screen.getByRole('dialog');
    for (const label of ['Problem:', 'Research:', 'Design:', 'Result:']) {
      expect(dialog.textContent).toContain(label);
    }
  });

  it('CM CRAFT MAP is ONE card (the Free Fire map-building website was merged into it)', () => {
    const { container } = render(<ShowExperience />);
    expect(screen.queryByRole('heading', { name: /Free Fire Map-Building Competition Website/ })).toBeNull();
    const toSite = [...container.querySelectorAll('a.project-card__thumb--link')].filter(
      (a) => a.getAttribute('href') === 'https://cmcraftmap.camt.cmu.ac.th/',
    );
    expect(toSite).toHaveLength(1);

    const card = screen.getByRole('heading', { name: /CM CRAFT MAP/ }).closest('article')!;
    expect(card.textContent).toMatch(/One official website with everything teams need/);
    fireEvent.click(within(card).getByRole('button', { name: 'SEE MORE' }));
    const labels = [...screen.getByRole('dialog').querySelectorAll('.modal-details-list strong')].map((s) => s.textContent);
    expect(labels).toEqual(['Problem:', 'Solution:', 'My role:', 'Helped:']);
  });

  it('every project card leads with a short summary and SEE MORE uses labelled sections', () => {
    render(<ShowExperience />);
    const card = screen.getByRole('heading', { name: /ETHChaingmai/ }).closest('article')!;
    expect(card.textContent).toMatch(/Relief Mesh: a communication tool for disasters/);
    expect(card.textContent).toContain('Frontend Developer • Idea & Design');
    fireEvent.click(within(card).getByRole('button', { name: 'SEE MORE' }));
    const labels = [...screen.getByRole('dialog').querySelectorAll('.modal-details-list strong')].map((s) => s.textContent);
    expect(labels).toEqual(['Problem:', 'Idea:', 'My role:']);
  });

  it('AI Agent Workshop SEE MORE shows Setup and Impact', () => {
    render(<ShowExperience />);
    const card = screen.getByRole('heading', { name: /AI Agent Workshop/ }).closest('article')!;
    fireEvent.click(within(card).getByRole('button', { name: 'SEE MORE' }));
    const labels = [...screen.getByRole('dialog').querySelectorAll('.modal-details-list strong')].map((s) => s.textContent);
    expect(labels).toEqual(['Setup:', 'Impact:']);
  });

  it('lists the AI Agent TA role and the Esports end game design with their links', () => {
    render(<ShowExperience />);
    expect(screen.getByText(/CAMT Digital Contest 2026 : AI Agent Workshop/)).toBeInTheDocument();
    expect(screen.getByText('Teaching Assistant (TA)')).toBeInTheDocument();
    expect(screen.getByText(/End Game Design/)).toBeInTheDocument();
    const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
    expect(hrefs).toContain('https://www.youtube.com/live/skfuqIVAbzE');
    expect(hrefs.some((h) => h?.startsWith('https://camt.cmu.ac.th/'))).toBe(true);
  });
});
