# Use modularized

In order to solve the problem of excessive file size in the production environment, React Suite supports ES Module, you can remove the useless code in the file through the Tree Shaking function of the packaging tool.

- [Tree Shaking in rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
- [Tree Shaking in Webpack](https://webpack.js.org/guides/tree-shaking/)

If your current development environment does not support `Tree Shaking`, you can use the following 2 methods.

## Method 1: Manually import

Manual import requires only importing the files used when writing the code, such as using only the `<Button>` component:

```js
import Button from 'rsuite/lib/Button';
```

Import the corresponding style file:

```diff
import Button from 'rsuite/lib/Button';
+ import 'rsuite/lib/Button/styles';  // import default style less
```

You can also import the specified theme style:

```diff
import Button from 'rsuite/lib/Button';
+ import 'rsuite/lib/Button/styles/themes/dark';  // import dark theme less
```

## Method 2：Use babel-preset-rsuite

Use [babel-preset-rsuite](https://github.com/rsuite/babel-preset-rsuite) to convert code into an on-demand import during the `Babel` compilation phase.

### Install babel-preset-rsuite

```bash
$ npm install babel-preset-rsuite --save-dev
```

#### Config

```json
// .babelrc or babel-loader option
{
  "presets": ["rsuite"]
}
```

Sample code:

```js
// Transforms:
import { Button } from 'rsuite';

// Roughly to:
var _Button = require('rsuite/lib/Button');
```

#### Parameter configuration

```json
{
  "presets": [["rsuite", { "style": true, "theme": "dark" }]]
}
```

- `style` (boolean) , Import style files as needed.
- `theme` ('default'|'dark'), Import style files for the specified theme.

Sample code:

```js
// Transforms:
import { Button } from 'rsuite';

// Roughly to:
require('rsuite/lib/Button/styles/themes/dark.less');
var _Button = require('rsuite/lib/Button');
```

## Disabled HTML styles reset

We reset some HTML styles in rsuite by default.But you may not need these styles when you use modularized. So you should [disable import it][config-reset-import] . This is the example config for `less-loader` :

```
{
    test: /\.less$/,
    loader: 'less-loader',
    options: {
        // If you are using less-loader@5 or older version, please spread the lessOptions to options directly.
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: { '@reset-import': false }
        }
    }
}
```

[config-reset-import]: /en/guide/themes#Disable%20styles%20reset
