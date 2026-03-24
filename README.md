# LumieraMed — Hospital Dashboard

A production-ready medical placement management dashboard built with the latest web stack.

## Tech Stack

| Tool | Version | Notes |
|------|---------|-------|
| [Next.js](https://nextjs.org) | **15.1** | App Router, Turbopack dev |
| [React](https://react.dev) | **19** | RC compiler-ready |
| [TypeScript](https://typescriptlang.org) | **5.7** | `strict` mode, `bundler` resolution |
| [Tailwind CSS](https://tailwindcss.com) | **4.0** | New `@theme` CSS variables, `@tailwindcss/postcss` |
| [ESLint](https://eslint.org) | **9** | Flat config format |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev

# Type-check without building
npm run type-check

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
lumieramed/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (metadata, fonts)
│   │   ├── page.tsx            # Entry → renders <AppShell />
│   │   └── globals.css         # Tailwind v4 + @theme variables + Google Fonts
│   ├── components/
│   │   ├── AppShell.tsx        # Client-side page router & state
│   │   ├── Layout.tsx          # Sidebar navigation + topbar
│   │   ├── Login.tsx           # Login form with loading state
│   │   ├── Dashboard.tsx       # Stats, placements, notifications
│   │   ├── Placements.tsx      # Full CRUD placements table
│   │   ├── PlacementModal.tsx  # Accessible create/edit modal
│   │   ├── Applications.tsx    # Filterable applications list
│   │   ├── ApplicationDetail.tsx # Student profile + accept/reject
│   │   ├── Messages.tsx        # Chat UI with auto-reply simulation
│   │   ├── Settings.tsx        # Profile + security forms
│   │   ├── Icon.tsx            # Typed SVG icon primitive
│   │   └── ui.tsx              # Toggle, Avatar, Logo, StatusBadge
│   └── types/
│       └── index.ts            # Shared TypeScript interfaces
├── next.config.ts              # Next.js 15 TS config
├── tsconfig.json               # TS 5 strict config
├── postcss.config.mjs          # @tailwindcss/postcss (v4)
├── eslint.config.mjs           # ESLint 9 flat config
└── package.json
```

## Pages

| Route / State | Component | Description |
|---------------|-----------|-------------|
| Login | `Login.tsx` | Split layout, form validation, loading spinner |
| Dashboard | `Dashboard.tsx` | Stats, placements table, notifications, quick actions |
| Placements | `Placements.tsx` | Full table — toggle, delete, create modal |
| Applications | `Applications.tsx` | Search + status filter, results count |
| Application Detail | `ApplicationDetail.tsx` | Student info, documents, accept/reject |
| Messages | `Messages.tsx` | Contact list, live chat, auto-reply, send on Enter |
| Settings > Profile | `Settings.tsx` | Hospital profile form, save feedback |
| Settings > Security | `Settings.tsx` | Password change, strength meter, validation |

## Key TypeScript Features

- **Strict mode** enabled — no implicit `any`, full null checks
- **Discriminated unions** for `Page`, `Status`, `SaveState`, `DecisionStatus`
- All props interfaces explicitly typed
- `useMemo`, `useCallback`, `useRef` with correct generic types
- `FormEvent`, `KeyboardEvent` typed event handlers
- `as const` assertions for static data arrays

## Tailwind v4 Notes

Tailwind CSS v4 uses a completely new configuration system:

```css
/* globals.css — no tailwind.config.js needed */
@import "tailwindcss";

@theme {
  --color-teal-500: #14b8a6;
  --font-sans: "DM Sans", sans-serif;
}
```

The `postcss.config.mjs` uses `@tailwindcss/postcss` instead of the old `tailwindcss` plugin.

## Deployment

Deploy instantly on [Vercel](https://vercel.com):

```bash
npx vercel
```

Or build a Docker image:

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]
```
# medical-dashboard
