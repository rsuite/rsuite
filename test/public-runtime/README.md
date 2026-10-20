This fixture checks the freshly built package in a DOM-free Node process with React 18.2 and React 19. It loads natural CommonJS root and component entries and bundles the actual `package.module` entries with esbuild, keeping React and package dependencies external.

Run from the repository root:

```sh
npm ci --prefix test/public-runtime --legacy-peer-deps --ignore-scripts
npm run build:ts
npm run test:public-runtime
```

The assertions cover public export identity, Form values and linked errors, error-summary navigation, a zero-valued Picker selection, ordinary Button markup, and callbacks remaining idle during SSR. Both server-rendering methods must produce matching CommonJS and bundled ESM markup without creating DOM globals. Results and build inputs are retained in `test/public-runtime/results` for CI diagnostics.

To check the UMD distributions in Chromium and Firefox:

```sh
npm ci --prefix test/public-runtime --legacy-peer-deps --ignore-scripts
npx playwright install chromium firefox
npm run dist
npm run test:public-umd
```

The browser runner loads the actual `lib/dist/rsuite.js` and `rsuite.min.js` artifacts unchanged. Only the React 18.2 and React 19 peer bridges are bundled with esbuild. It edits Form controls through native browser input and checks nested array paths, enumerable Symbol metadata, and immutable updates to Date, Map, Set, and typed array containers. This catches behavior stripped during bundling that source tests and the CommonJS/ESM SSR checks cannot detect.

CI runs both browser engines against both artifacts and React versions. For a local run, `RSUITE_UMD_BROWSERS=webkit npm run test:public-umd` selects WebKit; comma-separated combinations are also supported. Install the selected browsers with Playwright first. Results include artifact and lockfile hashes, peer build inputs, browser versions, failed-case screenshots, and errors in `test/public-runtime/results/umd-*`.

The UMD Form cases also use plain custom label/help roots that forward their IDs without
accepting refs, and verify that the resulting ARIA references resolve to those elements.

These checks do not test native Node ESM loading, hydration, or React Server Components.
