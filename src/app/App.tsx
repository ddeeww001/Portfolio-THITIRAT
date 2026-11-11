import '../shared/styles/variables.css';
import '../shared/styles/trionn-components.css';
import '../shared/styles/App.css';
import '../shared/styles/glass.css';
import './styles/navbar.css';
import './styles/home.css';

import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { SkyBackdrop } from '../shared/components/SkyBackdrop';
import { StudioStatementSection } from '../features/studio/StudioStatementSection';
import { ServicesSection } from '../features/studio/ServicesSection';
import { StudioFAQ } from '../features/studio/StudioFAQ';
import Experience from '../features/projects/showExperience';
import { Profile } from '../features/profile/Personal';
import { profileDatabase } from '../features/profile/profileData';
import Certificate from '../features/certificates/certificate';
import { ContactSection } from '../features/contact/ContactSection';

/** Page composition only — each section lives in its own feature folder. No loading screen: the page shows immediately. */
function App() {
  return (
    <div className="app-container">
      <SkyBackdrop />
      <Navbar />

      <main>
        <HeroSection />
        <StudioStatementSection />
        <ServicesSection />

        <section id="experience" className="section experience-section">
          <Experience />
        </section>

        <section id="profile" className="section profile-section">
          <Profile data={profileDatabase} />
        </section>

        <Certificate />
        <StudioFAQ />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
