import type { Character } from '../../types/character';
import './CharacterCard.css';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <div className="character-card__info">
        <h3>{character.name}</h3>
        <p>{character.species}</p>
        <p>{character.location.name}</p>
      </div>
    </div>
  );
}

