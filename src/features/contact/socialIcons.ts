import type { ReactElement, SVGProps } from 'react';
import { FacebookIcon, GitHubIcon, InstagramIcon, LineIcon } from '../../shared/components/ContactIcons';

/** Icon for a social entry from profileDatabase.socials, keyed by its label. */
export const socialIcons: Record<string, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  GitHub: GitHubIcon,
  Line: LineIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};
