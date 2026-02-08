# Permission-Based System Manager

A small local-first demo showing authentication, authorization, context state, and localStorage persistence in a React + Vite app.

Goals:
- Render resources based on user role (Viewer, Editor, Admin).
- Simulate fetch delays and loading states.
- Persist login across reloads using `localStorage` and react to cross-tab changes.
- Protect routes and redirect unauthorized access.

Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

How to use
- Open the app and go to `/login` to choose a role and log in.
- After login you land on the Resource Dashboard where items appear or show as locked depending on your role.
- Actions:
  - Editors and Admins can toggle status (active/archived) for resources that meet their role.
  - Admins can delete resources.

Key implementation files
- Auth provider and persistence: [src/context/AuthContext.jsx](src/context/AuthContext.jsx)
- Cross-tab listener hook: [src/hooks/useLocalStorageListener.js](src/hooks/useLocalStorageListener.js)
- Role-based resource filter: [src/hooks/useFilteredResources.js](src/hooks/useFilteredResources.js)
- Mock resources: [src/data/resources.js](src/data/resources.js)
- Dashboard and lists: [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx) and [src/components/ResourceList.jsx](src/components/ResourceList.jsx)
- Resource item UI and per-action checks: [src/components/ResourceItem.jsx](src/components/ResourceItem.jsx)
- Route protection: [src/components/ProtectedRoute.jsx](src/components/ProtectedRoute.jsx)

Notes and next steps
- The app simulates API fetches with a `setTimeout` in the dashboard to practice loading state handling.
- The auth system stores a small JSON object at `localStorage.pbs_user` and rehydrates on load.
- Clearing `localStorage` in another tab will log out the current tab immediately thanks to the `storage` event listener.

If you want, I can:
- Add an `/admin/:id` resource detail route with stricter role checks.
- Commit changes on a new git branch.
- Add a minimal test or a demo GIF.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
