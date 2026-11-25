# CSS Variables

All modern browsers support CSS variables. In React Suite, we use CSS variables to define the styles of components, and you can customize the styles of components by overriding CSS variables.

## Shadow DOM

Load the RSuite stylesheet inside each shadow root that renders RSuite components. The stylesheet supplies the default tokens on its host. The full stylesheet also supplies inherited text styles inside the shadow root. To use dark or high-contrast mode, set `data-theme="dark"` or `data-theme="high-contrast"` on an element inside the shadow root that contains the components.

With Vite, you can load the stylesheet as text with `?inline`. Here is an example for an element named `host`.

```jsx
import { createRoot } from 'react-dom/client';
import { Button } from 'rsuite';
import css from 'rsuite/dist/rsuite.css?inline';

const shadow = host.attachShadow({ mode: 'open' });
const style = document.createElement('style');
style.textContent = css;
const mount = document.createElement('div');
mount.dataset.theme = 'dark';
shadow.append(style, mount);
createRoot(mount).render(<Button appearance="primary">Save</Button>);
```

For a component with a portal, pass its `container` prop an element inside the same themed wrapper. This keeps the popup within the shadow root and its styles.

The [Web Component example](https://github.com/rsuite/rsuite/tree/main/examples/with-web-component) shows a SelectPicker with an isolated theme and popup.

<div id="ad-view"></div>
