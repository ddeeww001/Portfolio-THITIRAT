import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { sanitizeInput } from '../lib/security';

export const ALL_FILTER = 'ALL';

interface Options<T> {
  items: readonly T[];
  /** Does the item belong to the selected filter tab? ('ALL' always matches.) */
  matchesFilter: (item: T, filter: string) => boolean;
  /** Does the item match the (lower-cased, non-empty) search query? */
  matchesSearch: (item: T, query: string) => boolean;
  /** How long the "updating" indicator stays on after typing or switching filters (ms). */
  feedbackMs?: number;
}

/**
 * Search + filter-tab state shared by list sections (projects, certificates).
 * The UI pieces that go with it live in shared/components/ListControls.tsx.
 */
export function useFilteredList<T>({ items, matchesFilter, matchesSearch, feedbackMs = 200 }: Options<T>) {
  const [query, setQueryState] = useState('');
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const [isUpdating, setIsUpdating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const flashUpdating = () => {
    setIsUpdating(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIsUpdating(false), feedbackMs);
  };

  const setQuery = (raw: string) => {
    setQueryState(sanitizeInput(raw));
    flashUpdating();
  };

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    flashUpdating();
  };

  const reset = () => {
    setActiveFilter(ALL_FILTER);
    setQueryState('');
  };

  // The input updates instantly; re-filtering/re-rendering the list runs at lower priority, so typing
  // never stutters. (Data is local — there is nothing to "lazy load" or fetch while searching.)
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return items.filter(
      (item) =>
        (activeFilter === ALL_FILTER || matchesFilter(item, activeFilter)) &&
        (q === '' || matchesSearch(item, q)),
    );
  }, [items, deferredQuery, activeFilter, matchesFilter, matchesSearch]);

  return {
    query,
    setQuery,
    clearQuery: () => setQueryState(''),
    activeFilter,
    selectFilter,
    isUpdating,
    filtered,
    total: items.length,
    reset,
  };
}
