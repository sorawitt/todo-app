# Minimal Todo App

This project is a clean and simple todo list built with React, TypeScript, Bun, and Vite.  
It focuses on a minimal interface where you can add new tasks, mark them as done,  
and keep the list short and tidy.

## Live Demo

> 🚀 **Live Demo:** <span style="color:#059669">https://todo-app-wine-eta.vercel.app/</span>  
> Take the latest build for a spin anytime.

## Features

- Add a task by typing and pressing Enter.
- Tick a checkbox to mark a task as complete.
- Toast feedback keeps you informed about success or error states.
- Tasks sync to a hosted mock API and mirror into local storage for quick reloads.
- Lightweight layout with Tailwind CSS styling.
- Written in TypeScript for safer components.

## Quick Start

```bash
bun install
bun dev
```

Or stick with the familiar `npm install && npm run dev`.  
Either command prints a local URL in the terminal—open it to try the app.

## Scripts

- `bun dev` / `npm run dev` – start the Vite dev server with hot reload.
- `bun run build` / `npm run build` – create a production build.
- `bun run preview` / `npm run preview` – preview the production build locally.
- `bun run lint` / `npm run lint` – run ESLint checks.

## Tech Stack

- React 19 with the new React Compiler enabled.
- TypeScript for types and safer props.
- Vite as the development/build tool.
- Bun as the package manager/runtime.
- Tailwind CSS for utility-first styling.
- lucide-react for lightweight icons (planned for upcoming UI tweaks).

## Roadmap Ideas

- Filter by completed or active tasks.
- Add edit and delete actions.
- Offline fallback when the API is unavailable.

## Contributing

Issues and pull requests are welcome. If you plan to contribute, please open an issue  
first so we can discuss the change and keep the app focused and simple.
