import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROOT, ROUTES } from './routes/route';

import MainPage from './pages/main/MainPage';
import NewPage from './pages/new/NewPage';
import ReadingPage from './pages/reading/ReadingPage';
import ReadingDetailPage from './pages/reading/ReadingDetailPage';
import ReadingEditPage from './pages/reading/ReadingEditPage';

function App() {
  return (
    <Routes>
      <Route path={ROOT.MAIN} element={<MainPage />} />
      <Route path={ROOT.READING} element={<ReadingPage />}>
        <Route path={ROUTES.READING} element={<ReadingDetailPage />} />
        <Route path={ROUTES.EDIT} element={<ReadingEditPage />} />
      </Route>
      <Route path={ROUTES.NEW} element={<NewPage />} />

      <Route path={'*'} element={<Navigate to={ROOT.MAIN} />} />
    </Routes>
  );
}

export default App;
