import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Navbar from './components/Navbar';
import BannerSection from './components/BannerSection';
import VehicleVariantsSection from './components/VehicleVariantsSection';
import DesignSection from './components/DesignSection';
import EngineHighlight from './components/EngineHighlight';
import TechFeaturesSection from './components/TechFeaturesSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import TestRideModal from './components/TestRideModal';
import SpecsModal from './components/SpecsModal';
import ThemeToggle from './components/ThemeToggle';

import { ThemeProvider, useTheme } from './context/ThemeContext';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function MainApp() {
  const { isDark } = useTheme();
  const [testRideOpen, setTestRideOpen] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  const [preselectedEdition, setPreselectedEdition] = useState('');

  useEffect(() => {
    // Initialize Lenis Smooth Scroll integrated with GSAP ScrollTrigger
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    window.__lenis = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Feed Lenis RAF into GSAP's high-precision internal ticker
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts/images load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      window.__lenis = null;
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeout);
    };
  }, []);

  const handleOpenTestRide = (editionName = '') => {
    setPreselectedEdition(editionName);
    setTestRideOpen(true);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${
      isDark ? 'dark bg-[#08090d] text-white' : 'light bg-white text-slate-900'
    } selection:bg-red-600 selection:text-white`}>
      {/* Floating Glass Navigation */}
      <Navbar 
        onOpenTestRide={() => handleOpenTestRide()} 
        onOpenSpecs={() => setSpecsOpen(true)} 
      />

      <main>
        {/* Standalone Banner Section with banner-bg.jpg scroll zoom effect */}
        <BannerSection onOpenTestRide={handleOpenTestRide} />

        {/* Standalone Vehicle Versions Showcase with clean showroom background */}
        <VehicleVariantsSection onOpenTestRide={handleOpenTestRide} />

        {/* Selection Area 2 Part A: Design Visuals (fluid, graceful scrolling) */}
        <DesignSection />

        {/* Selection Area 2 Part B: Engine Highlight (surprising highlight transition) */}
        <EngineHighlight />

        {/* Selection Area 3: Technology & Features Scrollytelling (horizontal pinned gallery) */}
        <TechFeaturesSection />

        {/* Selection Area 4: Installment Pricing & Financial Calculator */}
        <PricingSection onOpenTestRide={handleOpenTestRide} />
      </main>

      {/* Footer */}
      <Footer onOpenTestRide={() => handleOpenTestRide()} />

      {/* Interactive Modals */}
      <TestRideModal
        isOpen={testRideOpen}
        onClose={() => setTestRideOpen(false)}
        preselectedEdition={preselectedEdition}
      />

      <SpecsModal
        isOpen={specsOpen}
        onClose={() => setSpecsOpen(false)}
      />

      {/* Minimalist Floating Day/Night Theme Toggle at Bottom-Left Corner */}
      <ThemeToggle />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
