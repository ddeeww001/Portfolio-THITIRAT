import { useEffect, useState } from 'react';
import { navItems, type SectionId } from './navigation';

/** Tracks which page section is currently under the navbar while scrolling. */
export function useActiveSection(offset = 120): SectionId {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return active;
}
