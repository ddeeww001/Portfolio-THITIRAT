import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Profile } from '../../src/frontend/Personal';
import { profileDatabase } from '../../src/data/profileData';

describe('Personal Profile Component (Frontend Test Suite)', () => {
  it('renders user name, roles, and introduce paragraph', () => {
    render(<Profile data={profileDatabase} />);
    expect(screen.getByText(profileDatabase.name)).toBeInTheDocument();
    expect(screen.getAllByText(/UX\/UI Designer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Frontend Developer/i).length).toBeGreaterThan(0);
    expect(screen.getByText(profileDatabase.introduce)).toBeInTheDocument();
  });

  it('renders technical skill badges and language proficiencies', () => {
    render(<Profile data={profileDatabase} />);
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Thai')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('renders tools and software capabilities', () => {
    render(<Profile data={profileDatabase} />);
    expect(screen.getByText('Figma')).toBeInTheDocument();
    expect(screen.getByText('Canva')).toBeInTheDocument();
    expect(screen.getByText('Visual Studio Code')).toBeInTheDocument();
  });
});
