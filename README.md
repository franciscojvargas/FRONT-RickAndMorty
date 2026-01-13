# Aplicación de Personajes de Rick and Morty

Aplicación frontend desarrollada en React que consume la API pública
[The Rick and Morty API](https://rickandmortyapi.com/documentation) para listar
personajes y mostrar información detallada de cada uno.

---

## 🚀 Funcionalidades Implementadas

### ✅ Funcionalidades Actuales

- **Listado de personajes** con información completa:
  - Nombre, estado, especie, tipo y género
  - Planeta de origen y ubicación actual
  - Avatar con badge de estado (Alive/Dead/Unknown)
  - Efectos hover y focus en las tarjetas

- **Búsqueda de personajes**:
  - Búsqueda en tiempo real por nombre
  - Debounce de 300ms para optimizar peticiones
  - Manejo de resultados vacíos

- **Paginación completa**:
  - Navegación entre páginas con botones Anterior/Siguiente
  - Selección directa de páginas con botones numerados
  - Indicador de página actual y total de páginas
  - Elipsis inteligente para muchas páginas

- **Diseño responsive**:
  - Header fijo en la parte superior
  - Diseño adaptativo para móviles y tablets
  - Grid responsive para las tarjetas de personajes

### 🚧 Funcionalidades Pendientes

- Visualizar el detalle de un personaje al hacer clic:
  - Información completa del personaje
  - Otros personajes que viven en el mismo planeta
- Filtrado adicional de personajes por:
  - Especie
  - Localización
  - Estado
- Sistema de personajes favoritos

---

## 🛠️ Tecnologías utilizadas

- **React**
- **TypeScript**
- **Vite** como herramienta de desarrollo y build
- **The Rick and Morty API** como fuente de datos

---

## ▶️ Ejecución del proyecto

### Requisitos previos
- Node.js (versión 22 o superior)
- npm

### Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código