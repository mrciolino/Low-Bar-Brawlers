<h1><img align="center" height="50" src="./public/assets/dragon.svg"> Low Bar Brawlers </h1>

[![Website](https://img.shields.io/badge/website-live-%23af4543.svg?style=for-the-badge&logo=dungeonsanddragons&logoColor=white)](https://www.lowbarbrawlers.com/)

Welcome to the Low Bar Brawlers project — an online companion and archive for a Dungeons & Dragons 5e campaign that is actively running. This repository contains the site source, artwork, character profiles, posters, and a small collaborative drawing pad.

## What the site does

Low Bar Brawlers is primarily a browsable campaign archive and gallery. Key visitor-facing features:

- 🔗 Links to our Wiki, Github, and Session Logs
- 🎟️ Posters gallery — Click any poster to view a full-size image and download a print-ready copy.
- 🧙 Character roster and profiles — Browse player characters, read backstory and notes, and view associated artwork.
- ✍️ Collaborative drawing pad — A small real-time drawing canvas used during sessions; drawings persist to disk and are synchronized between connected clients.

## About the Website 

Eleven adventurers ventured into a dangerous world on an unforgettable quest. This site preserves the story of their chaotic journey — the people, places, and artwork created along the way.

- Start on the home page to see highlights and navigate to Posters or Characters.
- Visit the Posters gallery to open and download print-ready artwork.
- Open character profiles to read bios and view sprites/icons.

## Wiki Backup 📂

Looking for the wiki backup? 👉 [**Go here**](https://github.com/mrciolino/wiki-backup) 🔗

## Built With

This project uses a modern React + TypeScript stack with Bun for development and runtime. Backend and realtime features use Socket.IO and a small file-based persistence layer.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/Vite-%23401AEB.svg?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![shadcn](https://img.shields.io/badge/shadcn/ui-%23000000.svg?style=for-the-badge&logo=shadcnui&logoColor=white)


## Getting Started

To run the project locally:

Clone the repository:
```bash
git clone https://github.com/mrciolino/Low-Bar-Brawlers
cd Low-Bar-Brawlers
```

Install dependencies and start development servers (uses Bun):
```bash
bun install
bun run dev
```

The development setup typically launches:

- Frontend (Vite): http://localhost:5173
- Backend (Socket.IO server): http://localhost:3001

Open your browser and visit the frontend URL to explore the site.

## Scripts

- `bun run dev` - Start frontend and backend in development mode
- `bun run build` - Build the frontend for production
- `bun run start` - Start production servers

## Important data files

Two files you may want to edit to change site content without touching code:

```
Low Bar Brawlers
├───src/
│   └── data/
│       └── players.json         # Player/character data used by the site
└───public/
  └── characters/              # Artwork and poster images
```

In this repo the player data lives under `src/` and images under `public/` — search for `players.json` or `characters/` to find the exact files.

## License

MIT License — see the `LICENSE` file for details.

