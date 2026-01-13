import { useEffect, useState } from 'react';
import { getCharacters } from '../../services/api';
import type { Character } from '../../types/character';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import './Home.css';

export function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        setError(null);
        const response = await getCharacters();
        setCharacters(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar personajes');
      } finally {
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Cargando personajes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Personajes de Rick and Morty</h1>
      <div className="characters-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}