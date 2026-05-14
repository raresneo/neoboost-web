
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
// Lazy Load Pages
const TeamPage = lazy(() => import('./pages/TeamPage').then(module => ({ default: module.TeamPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const ProgramLandingPage = lazy(() => import('./pages/programs/ProgramLandingPage').then(module => ({ default: module.ProgramLandingPage })));
const ArticlePage = lazy(() => import('./pages/ArticlePage').then(module => ({ default: module.ArticlePage })));
const SeoLandingPage = lazy(() => import('./pages/SeoLandingPage').then(module => ({ default: module.SeoLandingPage })));
const SciencePage = lazy(() => import('./pages/SciencePage').then(module => ({ default: module.SciencePage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(module => ({ default: module.LegalPage })));
const ResultsPage = lazy(() => import('./pages/ResultsPage').then(module => ({ default: module.ResultsPage })));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage').then(module => ({ default: module.ProgramsPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(module => ({ default: module.PricingPage })));
const OfertaTreiPlusUnuPage = lazy(() => import('./pages/OfertaTreiPlusUnuPage').then(module => ({ default: module.OfertaTreiPlusUnuPage })));
const BookingPage = lazy(() => import('./pages/BookingPage').then(module => ({ default: module.BookingPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const DespreNoiPage = lazy(() => import('./pages/DespreNoiPage').then(module => ({ default: module.DespreNoiPage })));
import { captureUTMParameters } from './lib/utm';
import { SmoothScroll } from './components/ui/SmoothScroll';
// Performance: Disabled heavy global overlays (CustomCursor, SpeedScrollEffect, FilmGrain)
// Each added a full-screen GPU layer + requestAnimationFrame loop, causing scroll/cursor jank
// import { CustomCursor } from './components/ui/CustomCursor';
// import { SpeedScrollEffect } from './components/ui/SpeedScrollEffect';
// import { FilmGrain } from './components/ui/FilmGrain';

import { SkeletonLoader } from './components/ui/SkeletonLoader';
import { GamificationProvider } from './context/GamificationContext';

const App: React.FC = () => {
  // ... useEffect ...

  return (
    <BrowserRouter>
      <GamificationProvider>
        <SmoothScroll>
          {/* Performance: Removed heavy global overlays */}

          <Routes>
            {/* Standalone booking page — no navbar/footer, shareable link for Instagram */}
            <Route path="/programare" element={
              <Suspense fallback={<SkeletonLoader />}>
                <BookingPage />
              </Suspense>
            } />
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="science" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <SciencePage />
                </Suspense>
              } />
              <Route path="blog" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <SciencePage />
                </Suspense>
              } />
              <Route path="legal/:type?" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <LegalPage />
                </Suspense>
              } />
              <Route path="rezultate" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ResultsPage />
                </Suspense>
              } />
              <Route path="echipa" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <TeamPage />
                </Suspense>
              } />
              <Route path="profile" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ProfilePage />
                </Suspense>
              } />
              <Route path="programe" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ProgramsPage />
                </Suspense>
              } />
              <Route path="servicii-ems" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ServicesPage />
                </Suspense>
              } />
              <Route path="preturi" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <PricingPage />
                </Suspense>
              } />
              <Route path="oferta-3-plus-1" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <OfertaTreiPlusUnuPage />
                </Suspense>
              } />
              <Route path="contact" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ContactPage />
                </Suspense>
              } />
              <Route path="despre-noi" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <DespreNoiPage />
                </Suspense>
              } />

              {/* Legacy/Marketing Routes */}
              <Route path="program/:programId" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ProgramLandingPage />
                </Suspense>
              } />
              <Route path="articol/:articleId" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <ArticlePage />
                </Suspense>
              } />

              {/* Dynamic SEO Pages */}
              <Route path=":slug" element={
                <Suspense fallback={<SkeletonLoader />}>
                  <SeoLandingPage />
                </Suspense>
              } />

              {/* Fallback */}
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </GamificationProvider>
    </BrowserRouter>
  );
};

export default App;
