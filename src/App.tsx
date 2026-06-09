<<<<<<< HEAD
﻿import { useEffect, useState } from 'react';
import './App.css';
import './variables.css';
import './navbar.css';
import './home.css';
import './profile.css';
import './experience.css';

import Experience from './frontend/showExperience';
import { Profile, myDetailsData } from './frontend/Personal';
import profileImg from './picture/profile.jpg';

// Smooth scroll navigation with offset
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'profile'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="navbar">
      <nav>
        <button
          onClick={() => scrollToSection('home')}
          className={activeSection === 'home' ? 'active' : ''}
        >
          <i className="bi bi-house-door"></i> Home
        </button>
        <button
          onClick={() => scrollToSection('experience')}
          className={activeSection === 'experience' ? 'active' : ''}
        >
          <i className="bi bi-briefcase"></i> Experience
        </button>
        <button
          onClick={() => scrollToSection('profile')}
          className={activeSection === 'profile' ? 'active' : ''}
        >
          <i className="bi bi-person"></i> Profile
        </button>
        <button onClick={() => scrollToSection('home')} className="profile-btn">
          <img alt="profile" src={profileImg} className="navbar-profile-pic" />
        </button>
      </nav>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="section hero-section">
      <div className={`hero-glass-card ${isVisible ? 'fade-in' : ''}`}>
        <div className="hero-content">
          <p className="greeting animate-slide-down">
             WELCOME TO MY PORTFOLIO
          </p>
          <h1 className="hero-title animate-slide-up">
            THITIRAT SIRISAWAD
          </h1>
          <p className="hero-subtitle animate-fade-in">
            UX/UI Designer & Frontend Developer
          </p>
          <div className="hero-scroll-indicator">
            <i className="bi bi-chevron-double-down"></i>
          </div>
        </div>
      </div>
      <div className="hero-bg-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <HeroSection />

        <section id="experience" className="section experience-section">
          <Experience />
        </section>

        <section id="profile" className="section profile-section">
          <Profile data={myDetailsData} />
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <p>© 2026 THITIRAT SIRISAWAD. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/ddeeww001" target="_blank" rel="noreferrer">
              <i className="bi bi-github"></i> GitHub
            </a>
            <a href="mailto:dewthitirat@gmail.com">
              <i className="bi bi-envelope"></i> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
=======

import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './App.css'
import Experience from './frontend/showExperience'
import { Profile,myDetailsData} from './frontend/Personal'
import Home from './frontend/Home.tsx'
import profileImg from './picture/profile.jpg'
import './variables.css'
import './navbar.css'
import './profile.css'
import './experience.css'
const Navbar=()=>{
  return(
    <div className="navbar">
    <nav>
   
   <Link to ="/" >Home</Link>
    <Link to ="/Experience" >Experience</Link>
    <Link to ="/Profile">Profile</Link>

    
    <Link to="/profileImg">
     <img alt="ddeeww_o_o" 
     src={profileImg}  
     className="navbar-profile-pic"/>
     </Link>
     

    </nav>
    </div>
  );
};
function App() {
  

  return (
    <>
     <BrowserRouter>

     <div className='navebar'>
      <Navbar/>
      
      <div className="content-area">
      {/*เนื้อหาจะเปลี้ยนไปตาม url */}
      <Routes>
        {/* สำหรับการแสดงรูป */}
        <Route path='/profileImg' 
        element={
        <img 
        src={profileImg} 
        className="navbar-profile"
        />
        }/>
        <Route path='/' element={<Home/>}/>
        <Route path='/Experience' element={<Experience/>}/>
        <Route path='/Profile' element={<Profile data={myDetailsData}/>}/>

        


      </Routes>
      </div>
      <div className="body">
        <h1></h1>
      </div>




     </div>

     </BrowserRouter>
    </>
  )
}

export default App
>>>>>>> parent of e356d4d (docs(Portfolio_01): restructure project with centralized data management and unified dark theme)
