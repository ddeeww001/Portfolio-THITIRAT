import { render, screen, fireEvent, act, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Certificate from '../../../src/features/certificates/certificate';

describe('Certificate Component (Frontend Test Suite)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders certificate section title, search input, and category filters', () => {
    render(<Certificate />);
    expect(screen.getByText(/CERTIFICATIONS & CREDENTIALS \./i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search certification title/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ALL' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Lifelong Learning/i })).toBeInTheDocument();
  });

  it('filters certificates when typing in search input', async () => {
    vi.useFakeTimers();
    render(<Certificate />);

    const searchInput = screen.getByPlaceholderText(/Search certification title/i);
    fireEvent.change(searchInput, { target: { value: 'Agile' } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    const certElements = screen.getAllByText(/Agile Thinking/i);
    expect(certElements.length).toBeGreaterThan(0);
    vi.useRealTimers();
  });

  it('displays empty state card when 0 certificates match and allows resetting', async () => {
    vi.useFakeTimers();
    render(<Certificate />);

    const searchInput = screen.getByPlaceholderText(/Search certification title/i);
    fireEvent.change(searchInput, { target: { value: 'UnknownNotExistingCert999' } });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByText(/No certificates found/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /Reset Search/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/CERTIFICATIONS & CREDENTIALS/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('renders the certificates as a manually scrollable ticker with ← → controls', () => {
    render(<Certificate />);
    const region = screen.getByRole('region', { name: /Certificates/i });
    expect(region).toHaveAttribute('tabindex', '0'); // keyboard-scrollable
    expect(screen.getByRole('button', { name: /Scroll certificates left/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Scroll certificates right/i })).toBeInTheDocument();
  });

  it('duplicates rows for the loop but hides the copy from screen readers and keyboard', () => {
    render(<Certificate />);
    // accessible rows = one per certificate (copies are aria-hidden)
    const rows = screen.getAllByRole('button', { name: /Open certificate:/ });
    const allRows = screen.getAllByRole('button', { name: /Open certificate:/, hidden: true });
    expect(allRows.length).toBe(rows.length * 2);
    expect(allRows.filter((b) => b.getAttribute('tabindex') === '-1')).toHaveLength(rows.length);
  });

  it('opens and closes certificate preview lightbox modal', () => {
    render(<Certificate />);
    const previewButtons = screen.getAllByRole('button', { name: /Open certificate:/i });
    expect(previewButtons.length).toBeGreaterThan(0);

    fireEvent.click(previewButtons[0]);
    const close = screen.getByRole('button', { name: 'Close certificate' });
    expect(close).toBeInTheDocument();

    fireEvent.click(close);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('viewer shows an image (no PDF iframe) and the image itself links to the full PDF — no extra button', async () => {
    render(<Certificate />);
    fireEvent.click(screen.getAllByRole('button', { name: /Open certificate:/i })[0]);
    const dialog = screen.getByRole('dialog');

    expect(dialog.querySelector('iframe')).toBeNull(); // framing PDFs is blocked by X-Frame-Options
    const link = within(dialog).getByRole('link', { name: /Open full PDF:/ });
    expect(link.getAttribute('href')).toMatch(/\/certify_LifeLongLearning\/.+\.pdf$/);
    expect(link).toHaveAttribute('target', '_blank');
    expect(within(dialog).queryByText(/OPEN FULL PDF ↗/)).toBeNull();
    // only the close button remains
    expect(within(dialog).getAllByRole('button')).toHaveLength(1);
  });

  it('closes the viewer with Escape', () => {
    render(<Certificate />);
    fireEvent.click(screen.getAllByRole('button', { name: /Open certificate:/i })[0]);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
