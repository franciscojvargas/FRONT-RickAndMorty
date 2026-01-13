# Aplicación de Personajes de Rick and Morty

Aplicación frontend desarrollada en React que consume la API pública
[The Rick and Morty API](https://rickandmortyapi.com/documentation) para listar
personajes y mostrar información detallada de cada uno.

## Instrucciones para ejecutar el proyecto

### Requisitos previos
- Node.js (versión 22 o superior)
- npm

### Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

## Arquitectura y decisiones técnicas

El proyecto está estructurado en componentes, páginas, servicios y contextos. Se usa React con TypeScript y Vite.

- **Estructura**: Separación entre páginas (Home, CharacterDetail, Favorites), componentes reutilizables (CharacterCard, Header) y servicios (api.ts para las llamadas a la API).

- **Estado global**: Context API para gestionar los favoritos con persistencia en localStorage.

- **Routing**: React Router DOM para las rutas principales. El header actúa como navegación principal.

- **Estilos**: CSS modules por componente para mantener estilos encapsulados. Diseño responsive.

- **API**: Servicio centralizado para las llamadas a The Rick and Morty API.

- **TypeScript**: Tipos definidos para Character, Location y respuestas de la API para mayor seguridad de tipos.

## Mejoras futuras

- Tests unitarios y de integración
- Añadir más filtros de búsqueda
- Sistema de notificaciones para acciones (añadir/eliminar favoritos)