# RSuite in a Web Component

This example renders a SelectPicker inside a native custom element. Vite imports the RSuite stylesheet as text, and the custom element installs it inside its Shadow Root. The picker uses an element in the same Shadow Root as its popup container. The theme checkbox changes the theme only inside the custom element.

Build the checkout's RSuite package first so the example uses its JavaScript and CSS.

```sh
# From the repository root
npm ci --legacy-peer-deps
npm run build:ts
npm run build:scss

cd examples/with-web-component
npm ci
npm run dev
```

Use Tab to focus the picker, Enter to open it, the arrow keys to browse, and Enter to select. Escape closes the popup and keeps focus inside the custom element. Switch themes and repeat the same keyboard sequence.

Run `npm run build` and `npm run preview` to try the production bundle.
