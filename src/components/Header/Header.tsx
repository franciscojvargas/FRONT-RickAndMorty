import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import './Header.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  const isDetailPage = location.pathname.startsWith('/character/');
  const isFavoritesPage = location.pathname === '/favorites';

  return (
    <header className="header">
      <div className="header-content">
        {isDetailPage && (
          <button className="header-back-button" onClick={() => navigate('/')}>
            Volver
          </button>
        )}
        <Link to="/" className="header-title-link">
          <h1 className="header-title">Rick and Morty</h1>
        </Link>
        <nav className="header-nav">
          <Link
            to="/"
            className={`header-nav__link ${location.pathname === '/' ? 'header-nav__link--active' : ''}`}
          >
            Personajes
          </Link>
          <Link
            to="/favorites"
            className={`header-nav__link ${isFavoritesPage ? 'header-nav__link--active' : ''}`}
          >
            Favoritos {favorites.length > 0 && <span className="header-nav__badge">{favorites.length}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

