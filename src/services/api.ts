import type { Character, ApiResponse, Location } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(name?: string, page?: number): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();
  
  if (name) {
    params.append('name', name);
  }
  if (page) {
    params.append('page', page.toString());
  }
  
  const url = `${API_BASE_URL}/character${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    }
    throw new Error(`Error al obtener personajes: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE_URL}/character/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener el personaje: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getLocationByUrl(url: string): Promise<Location & { residents: string[] }> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error al obtener la ubicación: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getCharactersByIds(ids: number[]): Promise<Character[]> {
  if (ids.length === 0) return [];
  
  const idsString = ids.join(',');
  const response = await fetch(`${API_BASE_URL}/character/${idsString}`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener los personajes: ${response.statusText}`);
  }
  
  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}