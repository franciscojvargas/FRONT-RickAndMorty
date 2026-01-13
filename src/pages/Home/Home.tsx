import { useEffect, useState } from 'react';
import { getCharacters } from '../../services/api';
import type { Character } from '../../types/character';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { Header } from '../../components/Header/Header';
import './Home.css';

export function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        setError(null);
        const response = await getCharacters(searchValue || undefined);
        setCharacters(response.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar personajes');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    }

    const timeoutId = setTimeout(() => {
      fetchCharacters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-search">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="home-search__input"
          />
        </div>
        {loading && <div className="loading">Cargando personajes...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && characters.length === 0 && searchValue && (
          <div className="no-results">No se encontraron personajes con ese nombre</div>
        )}
        {!loading && !error && characters.length === 0 && !searchValue && (
          <div className="loading">Cargando personajes...</div>
        )}
        {!loading && !error && characters.length > 0 && (
          <div className="characters-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}