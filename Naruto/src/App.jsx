import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Componentes/HomePage';
import CharacterDetail from './Componentes/CharacterDetail';
import FavoritesPage from './Componentes/FavoritesPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/character/:id" element={<CharacterDetail />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default App;
