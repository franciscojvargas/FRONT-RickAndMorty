import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/character/');

  return (
    <header className="header">
      <div className="header-content">
        {isDetailPage && (
          <button className="header-back-button" onClick={() => navigate('/')}>
            Volver
          </button>
        )}
        <h1 className="header-title">Rick and Morty</h1>
      </div>
    </header>
  );
}

