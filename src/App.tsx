import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { Home } from './pages/Home/Home';
import { CharacterDetail } from './pages/CharacterDetail/CharacterDetail';
import { Favorites } from './pages/Favorites/Favorites';
import './App.css';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
