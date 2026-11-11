// Section ids used by the navbar and in-page buttons.
import { playClickSound } from '../shared/lib/SoundEffects';

export type SectionId = 'home' | 'services' | 'experience' | 'profile' | 'certificates' | 'faq' | 'contact';

export const navItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Work' },
  { id: 'profile', label: 'About' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const scrollToSection = (sectionId: SectionId) => {
  playClickSound();
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
