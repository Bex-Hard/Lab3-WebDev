import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { HomePage } from './pages/HomePage';
import { ForecastDetailsPage } from './pages/ForecastDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <Suspense fallback={<div className="card">Carregando página...</div>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="forecast/:city" element={<ForecastDetailsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;