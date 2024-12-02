import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ROUTES from './routes/route';

import MainPage from './pages/Main/MainPage';
import EditPage from './pages/Edit/EditPage';
import ReadingPage from './pages/Reading/ReadingPage';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.MAIN} element={<MainPage />} />
      <Route path={ROUTES.EDIT} element={<EditPage />} />
      <Route path={ROUTES.READING} element={<ReadingPage />} />

      <Route path={'*'} element={<Navigate to={ROUTES.MAIN} />} />
    </Routes>
  );
}

export default App;
