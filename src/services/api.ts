import type { Character, ApiResponse } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(): Promise<ApiResponse<Character>> {
  const response = await fetch(`${API_BASE_URL}/character`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener personajes: ${response.statusText}`);
  }
  
  return response.json();
}