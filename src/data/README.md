# Data Directory Documentation

This directory contains all centralized data for the portfolio application.

## Structure

```
src/data/
├── projectsData.ts    # All project/experience data
├── profileData.ts     # Personal profile information
└── README.md          # This file
```

## Files

### projectsData.ts

Contains all project and experience information with the following features:

- **Type-safe interfaces** for ProjectData and LinkItem
- **Main database array** with all projects
- **Helper functions**:
  - `getAllProjects()` - Get all projects
  - `getProjectById(id)` - Get specific project
  - `getProjectsByTag(tag)` - Filter by tag
  - `getRecentProjects(count)` - Get recent projects

**Usage Example:**

```typescript
import { projectsDatabase, getProjectById } from "../data/projectsData";

// Get all projects
const allProjects = projectsDatabase;

// Get specific project
const project = getProjectById(1);

// Filter by tag
const designProjects = getProjectsByTag("Design");
```

### profileData.ts

Contains personal profile information with the following features:

- **Type-safe interfaces** for ProfileData, SocialLink, and Language
- **Main profile object** with all personal information
- **Helper functions**:
  - `getProfileData()` - Get complete profile
  - `getContactInfo()` - Get contact details only
  - `getSocialLinks()` - Get social media links
  - `getSkills()` - Get technical skills and tools
  - `getLanguages()` - Get language proficiencies
  - `getCertifications()` - Get certifications

**Usage Example:**

```typescript
import { profileDatabase, getContactInfo } from "../data/profileData";

// Get full profile
const profile = profileDatabase;

// Get specific data
const contact = getContactInfo();
const skills = getSkills();
```

## Benefits of This Structure

1. **Centralized Data Management**: All data in one place, easy to update
2. **Type Safety**: TypeScript interfaces ensure data consistency
3. **Reusability**: Helper functions make data access easier
4. **Maintainability**: Separate data from components
5. **Scalability**: Easy to add new data or features

## Migration Notes

The old data structure has been migrated:

- `src/frontend/projects.json` → `src/data/projectsData.ts`
- Data in `src/frontend/Personal.tsx` → `src/data/profileData.ts`

All components have been updated to use the new data structure.

## Adding New Data

### Adding a New Project:

```typescript
// In projectsData.ts
export const projectsDatabase: ProjectData[] = [
  {
    id: 9, // New ID
    title: "New Project",
    date: "2026",
    role: "Developer",
    details: ["Description here"],
    link: [{ label: "Link", url: "https://..." }],
    tags: ["Tag1", "Tag2"],
  },
  // ... existing projects
];
```

### Updating Profile:

```typescript
// In profileData.ts
export const profileDatabase: ProfileData = {
  // ... update any field
  technicalSkills: ["Java", "HTML", "CSS", "React", "TypeScript", "NewSkill"],
  // ...
};
```
