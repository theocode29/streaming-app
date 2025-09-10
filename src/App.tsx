import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import EntryPage from './pages/EntryPage';
import MovieDetails from './pages/MovieDetails';
import AppContextProvider from './store/AppContextProvider';

function App() {
  return (
    <div className="app-container">
      <AppContextProvider>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </AppContextProvider>
    </div>
  );
}

export default App;
