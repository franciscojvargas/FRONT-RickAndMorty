import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Character } from '../types/character';

interface FavoritesContextType {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
  toggleFavorite: (character: Character) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'rickandmorty_favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character: Character) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === character.id)) {
        return prev;
      }
      return [...prev, character];
    });
  };

  const removeFavorite = (characterId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== characterId));
  };

  const isFavorite = (characterId: number) => {
    return favorites.some((fav) => fav.id === characterId);
  };

  const toggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

