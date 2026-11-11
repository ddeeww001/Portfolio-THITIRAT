import { useState } from 'react';
import '../shared/styles/variables.css';
import '../shared/styles/trionn-components.css';
import '../shared/styles/App.css';
import './styles/navbar.css';
import './styles/home.css';

import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { useAssetPreload } from './useAssetPreload';
import { Preloader } from '../shared/components/Preloader';
import { CustomCursor } from '../shared/components/CustomCursor';
import { PROFILE_IMAGE } from '../shared/constants';
import { MarqueeTicker } from '../features/studio/MarqueeTicker';
import { StudioStatementSection } from '../features/studio/StudioStatementSection';
import { ServicesSection } from '../features/studio/ServicesSection';
import { StudioFAQ } from '../features/studio/StudioFAQ';
import Experience from '../features/projects/showExperience';
import { Profile } from '../features/profile/Personal';
import { profileDatabase } from '../features/profile/profileData';
import Certificate from '../features/certificates/certificate';
import { ContactSection } from '../features/contact/ContactSection';

const PRELOAD_IMAGES = [PROFILE_IMAGE];

/** Page composition only — each section lives in its own feature folder. */
function App() {
  const [appReady, setAppReady] = useState(false);
  const isAssetsLoading = useAssetPreload(PRELOAD_IMAGES);

  return (
    <div className={`app-container ${appReady ? 'is-loaded' : 'is-loading'}`}>
      <Preloader isLoading={isAssetsLoading} minimumDuration={300} onComplete={() => setAppReady(true)} />
      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection />
        <MarqueeTicker />
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
