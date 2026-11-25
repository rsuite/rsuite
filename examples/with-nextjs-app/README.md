# React Suite + Next.js App Router Example

A modern Next.js application using the App Router with React Suite components.

## Features

- ✨ **Next.js 15** - App Router
- ⚛️ **React 19** - Cutting-edge React features
- 🎨 **React Suite 6** - Modern UI component library
- 📦 **TypeScript** - Full type safety
- 🚀 **Server Components** - Root layout and pages render on the server
- 🎯 **Client Components** - Theme provider and navigation handle browser interactions

## Installation

```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install

# Using bun
bun install
```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Building

Build for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
with-nextjs-app/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── layout.tsx      # Server layout with metadata and global styles
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── Navbar.tsx      # Client navigation with Next.js Link
│       └── Providers.tsx   # Client theme provider
├── public/                 # Static assets
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## Key Technologies

- **Next.js 15**: App Router and Server Components
- **React 19**: React rendering and hydration
- **React Suite**: A suite of React components for building enterprise applications
- **TypeScript**: Type-safe development experience
- **PostCSS**: CSS processing with modern features

The root layout and both pages are Server Components. `Providers` listens for system theme changes in the browser and wraps the page content with `CustomProvider`. `Navbar` is a Client Component so it can compose `Nav.Item` with Next.js `Link`. Keep browser state and event handlers in these client boundaries; pass server-rendered page content through the provider's `children` prop.

The About page imports `Stack` and `Button` from their individual `rsuite/Stack` and `rsuite/Button` entry points. Use these entry points when rendering React Suite components directly from a Server Component to avoid making the entire component barrel a client reference.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Suite Documentation](https://rsuitejs.com/) - Explore React Suite components
- [React Suite with Next.js App Router](https://rsuitejs.com/guide/use-next-app/) - Integration guide
- [TypeScript Documentation](https://www.typescriptlang.org/) - Learn TypeScript

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
