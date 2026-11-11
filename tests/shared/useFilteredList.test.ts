import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { ALL_FILTER, useFilteredList } from '../../src/shared/hooks/useFilteredList';

type Item = { name: string; tag: string };
const items: Item[] = [
  { name: 'Alpha Design', tag: 'design' },
  { name: 'Beta Frontend', tag: 'frontend' },
  { name: 'Gamma Design System', tag: 'design' },
];
const matchesFilter = (i: Item, f: string) => i.tag === f;
const matchesSearch = (i: Item, q: string) => i.name.toLowerCase().includes(q);

const setup = () => renderHook(() => useFilteredList({ items, matchesFilter, matchesSearch, feedbackMs: 100 }));

afterEach(() => vi.useRealTimers());

describe('useFilteredList (shared hook)', () => {
  it('starts with every item under the ALL filter', () => {
    const { result } = setup();
    expect(result.current.activeFilter).toBe(ALL_FILTER);
    expect(result.current.filtered).toHaveLength(3);
    expect(result.current.total).toBe(3);
  });

  it('filters by tab and by case-insensitive search together', () => {
    const { result } = setup();
    act(() => result.current.selectFilter('design'));
    expect(result.current.filtered.map((i) => i.name)).toEqual(['Alpha Design', 'Gamma Design System']);
    act(() => result.current.setQuery('  GAMMA '));
    expect(result.current.filtered.map((i) => i.name)).toEqual(['Gamma Design System']);
  });

  it('sanitizes the search input (strips HTML/script)', () => {
    const { result } = setup();
    act(() => result.current.setQuery('<script>alert(1)</script>Beta'));
    expect(result.current.query).toBe('Beta');
    expect(result.current.filtered.map((i) => i.name)).toEqual(['Beta Frontend']);
  });

  it('shows the "updating" flag briefly after typing, then clears it', () => {
    vi.useFakeTimers();
    const { result } = setup();
    act(() => result.current.setQuery('a'));
    expect(result.current.isUpdating).toBe(true);
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isUpdating).toBe(false);
  });

  it('reset() clears both search and filter', () => {
    const { result } = setup();
    act(() => {
      result.current.selectFilter('frontend');
      result.current.setQuery('zzz');
    });
    expect(result.current.filtered).toHaveLength(0);
    act(() => result.current.reset());
    expect(result.current.query).toBe('');
    expect(result.current.activeFilter).toBe(ALL_FILTER);
    expect(result.current.filtered).toHaveLength(3);
  });
});
