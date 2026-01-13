import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import './Header.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites } = useFavorites();
  const isHomePage = location.pathname === '/';
  const isFavoritesPage = location.pathname === '/favorites';

  const handleTitleClick = () => {
    if (!isHomePage) {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 
          className={`header-title ${!isHomePage ? 'header-title--clickable' : ''}`}
          onClick={handleTitleClick}
        >
          Rick and Morty
        </h1>
        <nav className="header-nav">
          <Link
            to="/"
            className={`header-nav__link ${isHomePage ? 'header-nav__link--active' : ''}`}
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

