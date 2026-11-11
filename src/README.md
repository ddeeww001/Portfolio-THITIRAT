# Source Structure

The code is organised **by feature**. Each feature folder holds its own component, CSS, data and helpers, so you can work on one part of the site without touching the others.

```
src/
├── main.tsx                 # Entry point: global CSS, security guards, render <App />
├── app/                     # Page shell (composition only)
│   ├── App.tsx              # Puts the sections in order
│   ├── navigation.ts        # Section ids + scrollToSection()
│   ├── useActiveSection.ts  # Which section is on screen (for the navbar)
│   ├── useAssetPreload.ts   # Waits for images + fonts before hiding the preloader
│   ├── layout/              # Navbar, NavIcon, SoundToggle, Footer
│   ├── sections/            # HeroSection
│   └── styles/              # navbar.css, home.css
├── config/
│   └── env.ts               # The ONLY place that reads VITE_* settings
├── features/
│   ├── profile/             # About section: Personal.tsx, profileData.ts, profile.css
│   ├── projects/            # Work section: showExperience, ProjectCard, ProjectThumbnail,
│   │                        #   ProjectModal, projectsData.ts, microlink.ts, experience.css
│   ├── certificates/        # Certificates: certificate.tsx, CertificateCard, PDFThumbnail,
│   │                        #   CertificateLightbox, certificatesData.ts, certificate.css
│   ├── contact/             # ContactSection, socialIcons
│   ├── github/              # GitHubSection (live GitHub API)
│   └── studio/              # ServicesSection, StudioFAQ, MarqueeTicker, StudioStatementSection
├── shared/                  # Used by more than one feature
│   ├── components/          # Preloader, CustomCursor, ContactIcons, ListControls
│   ├── hooks/               # useFilteredList (search + filter tabs)
│   ├── lib/                 # security.ts, SoundEffects.ts
│   ├── styles/              # variables.css, App.css, trionn-components.css
│   └── constants.ts         # Shared asset paths
└── backend/services/        # Express server (separate from the Vite app)
```

Tests in `tests/` follow the same layout (`tests/app`, `tests/config`, `tests/features/<name>`, `tests/shared`, plus `tests/security`).

## Rules of thumb

1. **A feature never imports another feature's internals.** Anything two features need goes in `shared/`. (Reading `features/profile/profileData.ts` from other places is the one accepted exception: it is the site's profile data.)
2. **`app/` only composes.** New page content goes into a feature, and `App.tsx` just places it.
3. **Personal data comes only from `.env`** through `config/env.ts`. Never hardcode names, emails, phone numbers or social handles in `src/`. `tests/config/envPrivacy.test.ts` fails if you do.
4. **Each feature imports its own CSS.**
5. **Component files export only components.** Put constants and helpers in a `.ts` file next to them, so React Fast Refresh keeps working.

## Common tasks

### Add a project
Add an entry to `projectsDatabase` in `features/projects/projectsData.ts`:

```ts
{
  id: 9,
  title: 'New Project',
  date: '2026',
  role: 'Developer',
  details: ['Description here'],
  link: [{ label: 'Link', url: 'https://...' }],
  tags: ['Frontend'],
}
```

### Add a certificate
1. Put the PDF in `public/certify_LifeLongLearning/`.
2. Add the title to `certifications` in `features/profile/profileData.ts`.
3. If the file name differs from the title, add it to `certFiles` in `features/certificates/certificatesData.ts`.
   `tests/features/certificates/certificatesData.test.ts` checks that every PDF exists.

### Add a searchable list section
Use `useFilteredList` together with `SearchBox`, `ResultCounter`, `FilterTabs` and `EmptyState` from `shared/components/ListControls.tsx`. `features/projects/showExperience.tsx` shows how.

### Add a new section
Create `features/<name>/<Name>Section.tsx` (and its CSS), add a test in `tests/features/<name>/`, then place it in `app/App.tsx`. If it needs a navbar link, add it to `navItems` in `app/navigation.ts`.
