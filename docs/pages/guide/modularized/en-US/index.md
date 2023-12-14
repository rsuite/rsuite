# Minimizing Bundle Size

We should make the compiled files as small as possible to improve user experience.

## Tree Shaking

Tree Shaking is a method of optimizing the volume by removing unused code in the final file. The components must be imported via ES modules.

```js
import { Button, Input } from 'rsuite';
```

Then configure it in the packaging build tool:

- [Tree Shaking in rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
- [Tree Shaking in Webpack](https://webpack.js.org/guides/tree-shaking/)

⚠️ If your development environment does not support `Tree Shaking`, you can also use the following methods to minimize the packaged file size.

## Use path import

Path import is to import only the files that are used when writing the code, so as to avoid importing unused modules. For example:

```diff
- import { Button } from 'rsuite';
+ import Button from 'rsuite/Button';
```

Import button style file:

```diff
import Button from 'rsuite/Button';
+ import 'rsuite/Button/styles/index.less';
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
          modifyVars: { '@enable-css-reset': false }
        }
    }
}
```

[config-reset-import]: /guide/customization-less/#disable-html-styles-reset
