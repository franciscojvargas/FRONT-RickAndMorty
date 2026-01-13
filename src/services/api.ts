import type { Character, ApiResponse, Location, CharacterFilters } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function getCharacters(filters?: CharacterFilters): Promise<ApiResponse<Character>> {
  const params = new URLSearchParams();
  
  if (filters?.name) {
    params.append('name', filters.name);
  }
  if (filters?.status) {
    params.append('status', filters.status);
  }
  if (filters?.species) {
    params.append('species', filters.species);
  }
  if (filters?.location) {
    params.append('location', filters.location);
  }
  if (filters?.page) {
    params.append('page', filters.page.toString());
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

export async function getAllSpecies(): Promise<string[]> {
  const species = new Set<string>();
  let nextUrl: string | null = `${API_BASE_URL}/character`;
  
  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) break;
      
      const data: ApiResponse<Character> = await response.json();
      data.results.forEach(char => {
        if (char.species) species.add(char.species);
      });
      
      nextUrl = data.info.next;
      if (!data.info.next) break;
    }
  } catch (error) {
    console.error('Error obteniendo especies:', error);
  }
  
  return Array.from(species).sort();
}

export async function getAllLocations(): Promise<string[]> {
  const locations = new Set<string>();
  let nextUrl: string | null = `${API_BASE_URL}/location`;
  
  try {
    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) break;
      
      const data: ApiResponse<Location> = await response.json();
      data.results.forEach(loc => {
        if (loc.name) locations.add(loc.name);
      });
      
      nextUrl = data.info.next;
      if (!data.info.next) break;
    }
  } catch (error) {
    console.error('Error obteniendo localizaciones:', error);
  }
  
  return Array.from(locations).sort();
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