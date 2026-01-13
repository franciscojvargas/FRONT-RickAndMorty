import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCharacterById, getLocationByUrl, getCharactersByIds } from '../../services/api';
import type { Character } from '../../types/character';
import { Header } from '../../components/Header/Header';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { useFavorites } from '../../contexts/FavoritesContext';
import './CharacterDetail.css';

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [character, setCharacter] = useState<Character | null>(null);
  const [sameLocationCharacters, setSameLocationCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacterDetails() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const characterData = await getCharacterById(Number(id));
        setCharacter(characterData);

        if (characterData.location.url) {
          const location = await getLocationByUrl(characterData.location.url);
          
          if (location.residents && location.residents.length > 0) {
            const residentIds = location.residents
              .map(url => {
                const match = url.match(/\/(\d+)$/);
                return match ? Number(match[1]) : null;
              })
              .filter((id): id is number => id !== null && id !== characterData.id);

            if (residentIds.length > 0) {
              const residents = await getCharactersByIds(residentIds.slice(0, 6));
              setSameLocationCharacters(residents);
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el personaje');
      } finally {
        setLoading(false);
      }
    }

    fetchCharacterDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="character-detail-container">
          <div className="loading">Cargando personaje...</div>
        </div>
      </>
    );
  }

  if (error || !character) {
    return (
      <>
        <Header />
        <div className="character-detail-container">
          <div className="error">{error || 'Personaje no encontrado'}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="character-detail-container">
        <div className="character-detail">
          <div className="character-detail__main">
            <div className="character-detail__info">
              <div className="character-detail__image-wrapper">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="character-detail__image"
                />
                <span className={`character-detail__status character-detail__status--${character.status.toLowerCase()}`}>
                  {character.status}
                </span>
              </div>
              <div className="character-detail__content">
                <div className="character-detail__header">
                  <div className="character-detail__title-section">
                    <h1 className="character-detail__name">{character.name}</h1>
                    <button
                      className={`character-detail__favorite ${isFavorite(character.id) ? 'character-detail__favorite--active' : ''}`}
                      onClick={() => toggleFavorite(character)}
                      aria-label={isFavorite(character.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                      title={isFavorite(character.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    >
                      ♥
                    </button>
                  </div>
                </div>
              <div className="character-detail__details">
                <div className="character-detail__detail-item">
                  <span className="character-detail__label">Especie</span>
                  <span className="character-detail__value">{character.species}</span>
                </div>
                {character.type && (
                  <div className="character-detail__detail-item">
                    <span className="character-detail__label">Tipo</span>
                    <span className="character-detail__value">{character.type}</span>
                  </div>
                )}
                <div className="character-detail__detail-item">
                  <span className="character-detail__label">Género</span>
                  <span className="character-detail__value">{character.gender}</span>
                </div>
                <div className="character-detail__detail-item">
                  <span className="character-detail__label">Origen</span>
                  <span className="character-detail__value">{character.origin.name}</span>
                </div>
                <div className="character-detail__detail-item">
                  <span className="character-detail__label">Ubicación</span>
                  <span className="character-detail__value">{character.location.name}</span>
                </div>
                <div className="character-detail__detail-item">
                  <span className="character-detail__label">Episodios</span>
                  <span className="character-detail__value">{character.episode.length}</span>
                </div>
              </div>
              </div>
            </div>
          </div>

          {sameLocationCharacters.length > 0 && (
            <div className="character-detail__related">
              <h2>Otros personajes en {character.location.name}</h2>
              <div className="character-detail__same-location">
                {sameLocationCharacters.map((char) => (
                  <CharacterCard key={char.id} character={char} clickable={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

