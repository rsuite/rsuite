This fixture checks the freshly built package in a DOM-free Node process with React 18.2 and React 19. It loads natural CommonJS root and component entries and bundles the actual `package.module` entries with esbuild, keeping React and package dependencies external.

Run from the repository root:

```sh
npm ci --prefix test/public-runtime --legacy-peer-deps --ignore-scripts
npm run build:ts
npm run test:public-runtime
```

The assertions cover public export identity, Form values and linked errors, error-summary navigation, a zero-valued Picker selection, ordinary Button markup, and callbacks remaining idle during SSR. Both server-rendering methods must produce matching CommonJS and bundled ESM markup without creating DOM globals. Results and build inputs are retained in `test/public-runtime/results` for CI diagnostics.

This does not test native Node ESM loading, hydration, React Server Components, or UMD bundles.
