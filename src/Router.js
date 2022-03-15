import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BadRoute from './views/BadRoute';
import Character from './views/Character';
import Episode from './views/Episode';
import Favorites from './views/Favorites';
import Home from './views/Home';
import Location from './views/Location';

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
      <Route path="*" element={BadRoute} />
    </Routes>
  );
}

export default Router;
