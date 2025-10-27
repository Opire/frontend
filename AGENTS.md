# Repository Guidelines

## Project Structure & Module Organization
The application is a Next.js app rooted in `app/`, with route groups such as `home/`, `challenges/`, `dashboard/`, and `settings/`. Shared UI primitives and layout scaffolding reside in `app/_components` and `app/_core`, while cross-cutting helpers live in `app/_utils`. Reusable React hooks are collected under `hooks/`, and cross-session persistence logic is centralized in `TokenServiceLocalStorage.ts`. Project-wide constants sit in `constants.ts`, static assets (logos, favicons, OpenGraph images) live in `public/`, and configuration files (`next.config.js`, `tsconfig.json`) stay at the repo root.

## Build, Test, and Development Commands
- `npm run dev` — start the local dev server on port 3001 with hot reloading.
- `npm run build` — produce the production build; run before submitting deployment PRs.
- `npm run start` — serve the built app locally, mirroring production runtime.
- `npm run lint` / `npm run lint:fix` — check (or auto-fix) ESLint rules configured via `eslint-config-next`, `eslint-plugin-simple-import-sort`, and `eslint-plugin-unused-imports`.
- `npm run cpd` — run `jscpd` to detect duplicated code segments.
Containerized flows mirror these via `just dev`, `just build`, `make dev`, or `make lint`, which execute the same commands inside the Docker service defined in `docker-compose.yml`.

## Coding Style & Naming Conventions
Use TypeScript with 2-space indentation and prefer functional components. File and folder names follow lowercase-with-dashes for routes (e.g., `projects/active`) and PascalCase for component files inside `_components`. Keep imports sorted automatically (run `npm run lint:fix`) and avoid unused symbols. Favor named exports for shared utilities, colocate feature-specific styles or helpers alongside their route segment, and keep environment-specific configuration isolated in `app/api/` handlers.

## Testing Guidelines
Automated tests are not yet established; at minimum, ensure `npm run lint` and exploratory UI testing pass before opening a PR. When adding tests, place component specs alongside the feature folder (e.g., `app/challenges/__tests__/List.spec.tsx`) using React Testing Library and Jest conventions, and document any new scripts in `package.json`. Target high-value flows such as authentication, dashboard metrics, and bounty submission.

## Commit & Pull Request Guidelines
Follow Conventional Commit prefixes observed in the history (`feat:`, `fix:`, `doc:`, etc.) and keep the subject under 72 characters. For pull requests, include a concise summary, link related issues, list manual verification steps (commands run, browsers tested), and provide screenshots or screen recordings for UI-visible changes. Confirm the build and lint commands succeed locally, and highlight any configuration updates or migration steps reviewers must run.
