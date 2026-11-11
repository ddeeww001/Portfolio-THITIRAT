// Section ids used by the navbar and in-page buttons.
import { playClickSound } from '../shared/lib/SoundEffects';
import { hasContactChannels } from '../features/profile/profileData';

export type SectionId = 'home' | 'services' | 'experience' | 'profile' | 'certificates' | 'faq' | 'contact';

/** The Contact section is hidden in production when .env has no contact data, so its links go too. */
export const contactAvailable = hasContactChannels || import.meta.env.DEV;

const allNavItems: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'experience', label: 'Work' },
  { id: 'profile', label: 'About' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const navItems = allNavItems.filter((item) => item.id !== 'contact' || contactAvailable);

export const scrollToSection = (sectionId: SectionId) => {
  playClickSound();
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
