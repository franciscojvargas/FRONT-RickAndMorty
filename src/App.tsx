import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { CharacterDetail } from './pages/CharacterDetail/CharacterDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
