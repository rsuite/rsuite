# React Suite + Electron Example

A modern desktop application example built with React Suite and Electron.

## Features

- ✨ **React 19** - Latest React with Hooks
- 🎨 **React Suite 6** - Beautiful UI components
- ⚡ **Electron 45** - Modern desktop application framework
- 📦 **Electron Forge 7** - Complete toolchain for building and packaging
- 🔧 **Webpack 5** - Modern module bundler
- 🎯 **Babel** - JSX and modern JavaScript support

## Installation

Use Node.js 22.12 or newer.

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

## Development

Start the development server:

```bash
pnpm start
# or
npm start
# or
yarn start
```

The application will automatically open in a new Electron window with hot reload enabled.

## Building

Package the application:

```bash
pnpm run package
# or
npm run package
```

Create distributable:

```bash
pnpm run make
# or
npm run make
```

## Project Structure

```
with-electron/
├── src/
│   ├── main.js           # Electron main process
│   ├── preload.js        # Preload script
│   ├── renderer.js       # React application
│   ├── index.html        # HTML template
│   └── index.css         # Styles
├── .babelrc              # Babel configuration
├── .npmrc                # npm/pnpm configuration
├── forge.config.js       # Electron Forge configuration
├── webpack.*.config.js   # Webpack configurations
└── package.json
```

## Technologies

- **React Suite**: A suite of React components for building enterprise applications
- **Electron**: Framework for building cross-platform desktop applications
- **Electron Forge**: Complete toolchain for Electron apps
- **Webpack**: Module bundler with hot reload support
- **Babel**: JavaScript compiler for JSX and modern syntax

## Demo Features

The example demonstrates:

- 🖱️ **Click Counter**: Interactive button with state management
- 🔔 **Notifications**: Toast notifications using React Suite
- 🎚️ **Toggle Component**: Feature toggle with visual feedback
- 📊 **Environment Info**: Display Node.js, Chrome, and Electron versions
- 🎨 **Modern UI**: Beautiful gradient background with glassmorphism effects

## Notes

- This project uses **pnpm** with hoisted `node_modules` for better compatibility with Electron Forge
- Electron binaries are downloaded from the official mirror configured in `.npmrc`
- The application supports hot reload in development mode

## Learn More

- [React Suite Documentation](https://rsuitejs.com/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Forge Documentation](https://www.electronforge.io/)
