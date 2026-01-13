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
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<{ pages: number; next: string | null; prev: string | null }>({
    pages: 0,
    next: null,
    prev: null,
  });

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        setError(null);
        const response = await getCharacters(searchValue || undefined, currentPage);
        setCharacters(response.results);
        setPaginationInfo({
          pages: response.info.pages,
          next: response.info.next,
          prev: response.info.prev,
        });
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
  }, [searchValue, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (paginationInfo.prev) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationInfo.next) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const totalPages = paginationInfo.pages;
    const current = currentPage;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Si hay 7 o menos páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Si hay más de 7 páginas, mostrar un rango inteligente
      if (current <= 4) {
        // Cerca del inicio
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (current >= totalPages - 3) {
        // Cerca del final
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // En el medio
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-search">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
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
          <>
            <div className="characters-grid">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            <div className="pagination">
              <button
                className="pagination__button"
                onClick={handlePreviousPage}
                disabled={!paginationInfo.prev}
              >
                Anterior
              </button>
              <div className="pagination__pages">
                {getPageNumbers().map((page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                        ...
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      className={`pagination__page-button ${
                        page === currentPage ? 'pagination__page-button--active' : ''
                      }`}
                      onClick={() => handlePageClick(page as number)}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                className="pagination__button"
                onClick={handleNextPage}
                disabled={!paginationInfo.next}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}