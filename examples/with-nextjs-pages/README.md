This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/cli/create-next-app).

## Getting Started

Use Node.js 20.9 or later. The image optimizer's Sharp dependency requires this Node.js version.

Install with npm and the committed lockfile so the patched transitive dependencies are preserved:

```bash
npm ci
```

Then run the development server:

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

For questions or feedback, see the [Next.js community](https://nextjs.org/docs/community).

## Deploy on Netlify

Import your repository into Netlify and follow the [Next.js deployment guide](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
