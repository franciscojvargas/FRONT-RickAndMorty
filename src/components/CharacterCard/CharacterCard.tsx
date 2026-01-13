import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import type { Character } from '../../types/character';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  clickable?: boolean;
}

export function CharacterCard({ character, clickable = true }: CharacterCardProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const handleCardClick = () => {
    if (clickable) {
      navigate(`/character/${character.id}`);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(character);
  };

  return (
    <div 
      className={`character-card ${!clickable ? 'character-card--no-click' : ''}`}
      tabIndex={clickable ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && clickable) {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="character-card__image-wrapper">
        <img src={character.image} alt={character.name} />
        <button
          className={`character-card__favorite ${favorite ? 'character-card__favorite--active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          title={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          ♥
        </button>
        <span className={`character-card__status character-card__status--${character.status.toLowerCase()}`}>
          {character.status}
        </span>
      </div>
      <div className="character-card__info">
        <h3 className="character-card__name">{character.name}</h3>
        <div className="character-card__details">
          <div className="character-card__detail-item">
            <span className="character-card__label">Especie:</span>
            <span className="character-card__value">{character.species}</span>
          </div>
          {character.type && (
            <div className="character-card__detail-item">
              <span className="character-card__label">Tipo:</span>
              <span className="character-card__value">{character.type}</span>
            </div>
          )}
          <div className="character-card__detail-item">
            <span className="character-card__label">Género:</span>
            <span className="character-card__value">{character.gender}</span>
          </div>
          <div className="character-card__detail-item">
            <span className="character-card__label">Origen:</span>
            <span className="character-card__value">{character.origin.name}</span>
          </div>
          <div className="character-card__detail-item">
            <span className="character-card__label">Ubicación:</span>
            <span className="character-card__value">{character.location.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

