import React from 'react';
import { Route, Routes } from 'react-router-dom';

const BadRoute = React.lazy(() => import('./views/BadRoute'));
const Character = React.lazy(() => import('./views/Character'));
const Episode = React.lazy(() => import('./views/Episode'));
const Favorites = React.lazy(() => import('./views/Favorites'));
const Home = React.lazy(() => import('./views/Home'));
const Location = React.lazy(() => import('./views/Location'));

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/character/:id"
        element={(
          <React.Suspense fallback={<>...</>}>
            <Character />
          </React.Suspense>
            )}
      />
      <Route
        path="/location/:id"
        element={(
          <React.Suspense fallback={<>...</>}>
            <Location />
          </React.Suspense>
            )}
      />
      <Route
        path="/episode/:id"
        element={(
          <React.Suspense fallback={<>...</>}>
            <Episode />
          </React.Suspense>
            )}
      />
      <Route
        path="/favorites/"
        element={(
          <React.Suspense fallback={<>...</>}>
            <Favorites />
          </React.Suspense>
            )}
      />
      <Route path="*" element={<BadRoute />} />
    </Routes>
  );
}

export default Router;
