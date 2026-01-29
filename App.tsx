
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TeamPage } from './pages/TeamPage';
import { ProgramLandingPage } from './pages/programs/ProgramLandingPage';
import { SpecialOfferPage } from './pages/SpecialOfferPage';
import { ArticlePage } from './pages/ArticlePage';
import { SeoLandingPage } from './pages/SeoLandingPage';
import { captureUTMParameters } from './lib/utm';

// Lazy Load Secondary Pages
const SciencePage = lazy(() => import('./pages/SciencePage').then(module => ({ default: module.SciencePage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then(module => ({ default: module.LegalPage })));
const ResultsPage = lazy(() => import('./pages/ResultsPage').then(module => ({ default: module.ResultsPage })));

import { SmoothScroll } from './components/ui/SmoothScroll';
import { CustomCursor } from './components/ui/CustomCursor';

import { SpeedScrollEffect } from './components/ui/SpeedScrollEffect';

const App: React.FC = () => {
  useEffect(() => {
    captureUTMParameters();
  }, []);

  return (
    <BrowserRouter>
      <SmoothScroll>
        <CustomCursor />
        <SpeedScrollEffect />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="science" element={
              <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-[#3A86FF] font-bold">LOADING RESEARCH DATA...</div>}>
                <SciencePage />
              </Suspense>
            } />
            <Route path="legal/:type?" element={
              <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-[#3A86FF] font-bold">LOADING LEGAL DATA...</div>}>
                <LegalPage />
              </Suspense>
            } />
            <Route path="rezultate" element={
              <Suspense fallback={<div className="bg-black min-h-screen flex items-center justify-center text-[#3A86FF] font-bold">LOADING RESULTS...</div>}>
                <ResultsPage />
              </Suspense>
            } />
            <Route path="echipa" element={<TeamPage />} />

            {/* Legacy/Marketing Routes */}
            <Route path="program/:programId" element={<ProgramLandingPage />} />
            <Route path="oferta-speciala" element={<SpecialOfferPage />} />
            <Route path="articol/:articleId" element={<ArticlePage />} />

            {/* Dynamic SEO Pages (Must be last before 404/Fallback) */}
            <Route path=":slug" element={<SeoLandingPage />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  );
};

export default App;
