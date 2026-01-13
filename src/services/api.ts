import type { Character, ApiResponse } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(name?: string): Promise<ApiResponse<Character>> {
  const url = name 
    ? `${API_BASE_URL}/character?name=${encodeURIComponent(name)}`
    : `${API_BASE_URL}/character`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`Error al obtener personajes: ${response.statusText}`);
  }
  
  return response.json();
}