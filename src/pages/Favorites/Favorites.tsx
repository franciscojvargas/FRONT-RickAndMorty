import { Header } from '../../components/Header/Header';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { useFavorites } from '../../contexts/FavoritesContext';
import './Favorites.css';

export function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <Header />
      <div className="favorites-container">
        <h1 className="favorites-title">Personajes Favoritos</h1>
        
        {favorites.length === 0 ? (
          <div className="favorites-empty">
            <p>No tienes personajes favoritos aún.</p>
            <p>Haz clic en el corazón de cualquier personaje para agregarlo a favoritos.</p>
          </div>
        ) : (
          <>
            <p className="favorites-count">{favorites.length} personaje{favorites.length !== 1 ? 's' : ''} favorito{favorites.length !== 1 ? 's' : ''}</p>
            <div className="favorites-grid">
              {favorites.map((character) => (
                <CharacterCard key={character.id} character={character} clickable={true} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

