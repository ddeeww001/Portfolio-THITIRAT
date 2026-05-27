# Portfolio Website - THITIRAT SIRISAWAD

A modern, responsive portfolio website showcasing UX/UI design and frontend development work.

## 🚀 Features

### ✨ Recent Improvements (2026)

- **Centralized Data Management**: All data separated into dedicated database files
- **Enhanced UX/UI**: Modern glassmorphism design with smooth animations
- **Loading States**: Skeleton loaders for better user experience
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Performance**: Optimized animations and lazy loading

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── data/                    # 🆕 Centralized data directory
│   │   ├── projectsData.ts      # All project/experience data
│   │   ├── profileData.ts       # Personal profile information
│   │   └── README.md            # Data documentation
│   ├── frontend/                # React components
│   │   ├── Home.tsx             # 🔄 Enhanced home page
│   │   ├── Experience.tsx       # 🔄 Improved with loading states
│   │   ├── Personal.tsx         # Profile page
│   │   └── showExperience.tsx   # Experience display
│   ├── picture/                 # Images
│   ├── *.css                    # 🔄 Enhanced stylesheets
│   └── App.tsx                  # Main app component
└── public/                      # Static assets
```

## 🎨 Design Features

### Home Page

- Animated hero section with glassmorphism effect
- Gradient text animations
- Smooth fade-in transitions
- Interactive buttons with hover effects
- Background decorative elements

### Experience Page

- Card-based layout with hover effects
- Image preview with loading skeletons
- Tag system for categorization
- Staggered animations for cards
- Responsive grid layout

### Profile Page

- Two-column layout (sidebar + content)
- Organized sections for skills, tools, languages
- Social media links with icons
- Professional certification display

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern features
- **Type Safety**: TypeScript interfaces

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

The project uses:

- TypeScript for type safety
- ESLint for code quality
- Vite for fast development and building

## 📝 Data Management

All data is now centralized in `src/data/`:

### Adding New Projects

Edit `src/data/projectsData.ts`:

```typescript
export const projectsDatabase: ProjectData[] = [
  {
    id: 9,
    title: "New Project",
    date: "2026",
    role: "Developer",
    details: ["Description"],
    link: [{ label: "Link", url: "https://..." }],
    tags: ["Tag1", "Tag2"],
  },
  // ...
];
```

### Updating Profile

Edit `src/data/profileData.ts`:

```typescript
export const profileDatabase: ProfileData = {
  name: "Your Name",
  role: ["Role 1", "Role 2"],
  // ... other fields
};
```

## 🎯 Key Improvements

1. **Separation of Concerns**: Data separated from components
2. **Better UX**: Loading states, animations, and transitions
3. **Type Safety**: Full TypeScript implementation
4. **Maintainability**: Cleaner code structure
5. **Performance**: Optimized rendering and animations
6. **Accessibility**: Better semantic HTML and ARIA labels

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: > 900px

## 📄 License

Personal Portfolio Project

## 👤 Author

**THITIRAT SIRISAWAD**

- GitHub: [@ddeeww001](https://github.com/ddeeww001)
- Email: dewthitirat@gmail.com

---

Built with ❤️ using React + TypeScript + Vite
