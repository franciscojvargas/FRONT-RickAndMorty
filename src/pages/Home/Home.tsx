import { useEffect, useState } from 'react';
import { getCharacters, getAllSpecies, getAllLocations } from '../../services/api';
import type { Character, CharacterFilters } from '../../types/character';
import { CharacterCard } from '../../components/CharacterCard/CharacterCard';
import { Header } from '../../components/Header/Header';
import './Home.css';

export function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Alive' | 'Dead' | 'unknown' | ''>('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<{ pages: number; next: string | null; prev: string | null }>({
    pages: 0,
    next: null,
    prev: null,
  });
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);

  useEffect(() => {
    async function loadFilterOptions() {
      try {
        const [species, locations] = await Promise.all([
          getAllSpecies(),
          getAllLocations(),
        ]);
        setSpeciesOptions(species);
        setLocationOptions(locations);
      } catch (err) {
        console.error('Error cargando opciones de filtros:', err);
      }
    }

    loadFilterOptions();
  }, []);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setLoading(true);
        setError(null);
        
        const filters: CharacterFilters = {
          page: currentPage,
        };
        
        if (searchValue) {
          filters.name = searchValue;
        }
        if (statusFilter) {
          filters.status = statusFilter as 'Alive' | 'Dead' | 'unknown';
        }
        if (speciesFilter) {
          filters.species = speciesFilter;
        }
        if (locationFilter) {
          filters.location = locationFilter;
        }
        
        const response = await getCharacters(filters);
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
  }, [searchValue, statusFilter, speciesFilter, locationFilter, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as 'Alive' | 'Dead' | 'unknown' | '');
    setCurrentPage(1);
  };

  const handleSpeciesChange = (value: string) => {
    setSpeciesFilter(value);
    setCurrentPage(1);
  };

  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setStatusFilter('');
    setSpeciesFilter('');
    setLocationFilter('');
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
        <div className="home-filters">
          <div className="home-search">
            <label className="home-filter__label">Nombre</label>
            <input
              type="text"
              placeholder="Buscar personaje..."
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="home-search__input"
            />
          </div>
          
          <div className="home-filters__row">
            <div className="home-filter">
              <label className="home-filter__label">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="home-filter__select"
              >
                <option value="">Todos</option>
                <option value="Alive">Vivo</option>
                <option value="Dead">Muerto</option>
                <option value="unknown">Desconocido</option>
              </select>
            </div>

            <div className="home-filter">
              <label className="home-filter__label">Especie</label>
              <select
                value={speciesFilter}
                onChange={(e) => handleSpeciesChange(e.target.value)}
                className="home-filter__select"
              >
                <option value="">Todas</option>
                {speciesOptions.map((species) => (
                  <option key={species} value={species}>
                    {species}
                  </option>
                ))}
              </select>
            </div>

            <div className="home-filter">
              <label className="home-filter__label">Localización</label>
              <select
                value={locationFilter}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="home-filter__select"
              >
                <option value="">Todas</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {(statusFilter || speciesFilter || locationFilter || searchValue) && (
              <button
                className="home-filter__clear"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
        {loading && <div className="loading">Cargando personajes...</div>}
        {error && <div className="error">Error: {error}</div>}
        {!loading && !error && characters.length === 0 && (searchValue || statusFilter || speciesFilter || locationFilter) && (
          <div className="no-results">No se encontraron personajes con los filtros aplicados</div>
        )}
        {!loading && !error && characters.length === 0 && !searchValue && !statusFilter && !speciesFilter && !locationFilter && (
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