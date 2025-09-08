# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

# Low Bar Brawlers - Collaborative Drawing Pad

A real-time collaborative drawing application built with React, TypeScript, Socket.IO, and Bun.

## Features

- 🎨 **Real-time Collaborative Drawing** - Multiple users can draw simultaneously
- 🔄 **Live Synchronization** - All strokes appear instantly for all connected users
- ↩️ **Smart Undo** - Users can only undo their own strokes
- 🗑️ **Global Reset** - Clear the entire canvas for all users (with confirmation)
- 🎨 **Customizable Tools** - Multiple colors and brush thicknesses
- 💾 **Persistent Storage** - Drawings are saved to disk and restored on server restart
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Socket.IO Client** for real-time communication

### Backend
- **Node.js** with Express
- **Socket.IO** for WebSocket communication
- **TypeScript** for type safety
- **File-based persistence** (JSON)

### Development
- **Bun** for package management and runtime
- **Concurrently** for running frontend and backend together

## Quick Start

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Start development servers:**
   ```bash
   bun run dev
   ```
   This will start both the frontend (http://localhost:5173) and backend (http://localhost:3001)

3. **Open multiple browser tabs** to test collaborative features

## Scripts

- `bun run dev` - Start both frontend and backend in development mode
- `bun run dev:client` - Start only the frontend development server
- `bun run dev:server` - Start only the backend development server
- `bun run build` - Build the frontend for production
- `bun run build:server` - Build the backend for production
- `bun run start` - Start both frontend and backend in production mode
- `bun run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── drawing_pad.tsx      # Main collaborative drawing component
│   │   └── ui/                  # shadcn/ui components
│   └── ...
├── server/
│   ├── index.ts                 # Socket.IO server
│   ├── drawing.json             # Persisted drawing data (auto-generated)
│   └── README.md                # Server deployment guide
└── public/
    ├── assets/                  # Images and static assets
    └── characters/              # Character artwork
```

## API Endpoints

- `GET /health` - Server health check and statistics

## Socket.IO Events

### Client → Server
- `stroke` - Send a completed drawing stroke
- `undo` - Remove a specific stroke by ID
- `reset` - Clear the entire drawing

### Server → Client
- `init` - Initial drawing state for new connections
- `stroke` - New stroke broadcast to all clients
- `removeStroke` - Stroke removal broadcast
- `reset` - Drawing reset broadcast

## Production Deployment

1. **Build the application:**
   ```bash
   bun run build
   bun run build:server
   ```

2. **Start the production servers:**
   ```bash
   bun run start
   ```

For detailed production deployment instructions, see [server/README.md](server/README.md).

## Development Notes

- The drawing canvas uses HTML5 Canvas API for rendering
- Real-time drawing uses pointer events for better touch device support
- Each user gets a unique ID for tracking their strokes
- Drawing data is persisted to `server/drawing.json`
- The server loads existing drawings on startup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test collaborative functionality with multiple browser tabs
5. Submit a pull request

## License

MIT License - see LICENSE file for details

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
