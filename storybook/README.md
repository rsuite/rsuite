# RSuite Storybook

Use Node 24.22.0 with its bundled npm 11.19.1, matching the Storybook CI workflow. Install both dependency profiles from the repository root:

```sh
npm ci --legacy-peer-deps
npm ci --prefix storybook
npm run storybook --prefix storybook
```

The private Storybook app uses Storybook 10 and Vite 8. The SDK root retains its own build and authoring dependencies. Source stories and `createMeta` share `storybook/types.ts`, so their types come from the same installed Storybook package in either profile.

Build and check the complete preview before submitting changes:

```sh
node node_modules/typescript/bin/tsc --noEmit
npm run check --prefix storybook
npm run build-storybook --prefix storybook
node node_modules/playwright/cli.js install chromium firefox
npm run test:smoke --prefix storybook
```

The smoke opens the production build in Chromium and Firefox and checks Controls, Actions, public prop metadata, themes, welcome docs, the accessibility panel, picker selection, form input and table rendering. Results and failure screenshots are written to `storybook/test-results/`. The single-story accessibility scan does not establish library-wide conformance.

Run `M=Button npm run storybook --prefix storybook` to focus on one component during development. Use the full build for the smoke check. The CI workflow installs Storybook with default peer resolution and validates both browser engines without publishing a preview.
