import { useNavigate, useLocation } from 'react-router-dom';
import type { Character } from '../../types/character';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
  clickable?: boolean;
}

export function CharacterCard({ character, clickable = true }: CharacterCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (clickable) {
      navigate(`/character/${character.id}`);
    }
  };

  return (
    <div 
      className={`character-card ${!clickable ? 'character-card--no-click' : ''}`}
      tabIndex={clickable ? 0 : -1}
      onClick={handleClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && clickable) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="character-card__image-wrapper">
        <img src={character.image} alt={character.name} />
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

