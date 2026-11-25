# React Suite + Gatsby Example

A modern Gatsby site built with React Suite components.

## Features

- ✨ **React 18** - Latest React with Hooks
- 🎨 **React Suite 6** - Beautiful UI components
- ⚡ **Gatsby 5** - Blazing fast static site generator
- 📦 **SSR Support** - Server-side rendering ready
- 🎯 **TypeScript Ready** - Full type definitions

## Installation

```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install
```

## Development

Start the development server:

```bash
npm run develop
# or
npm start
```

The site will be available at `http://localhost:8000`

## Building

Build for production:

```bash
npm run build
```

Serve the production build:

```bash
npm run serve
```

## Project Structure

```
with-gatsby/
├── src/
│   ├── components/     # React components
│   │   ├── header.js
│   │   ├── layout.js
│   │   └── seo.js
│   ├── pages/         # Gatsby pages
│   │   ├── index.js
│   │   └── page-2.js
│   └── images/        # Static images
├── gatsby-config.js   # Gatsby configuration
└── package.json
```

## Technologies

- **React Suite**: A suite of React components for building enterprise applications
- **Gatsby**: Modern static site generator
- **React Icons**: Popular icon libraries
- **React Helmet**: Document head manager

## Troubleshooting

### Sharp Installation Error

If you encounter errors downloading "sharp", configure the mirror:

```bash
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp/"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips/"
```

### Clean Cache

If you encounter build issues:

```bash
npm run clean
npm install
```

## Learn More

- [React Suite Documentation](https://rsuitejs.com/)
- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [React Documentation](https://react.dev/)
