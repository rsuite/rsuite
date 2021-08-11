# Use modularized

In order to solve the problem of excessive file size in the production environment, React Suite supports ES Module, you can remove the useless code in the file through the Tree Shaking function of the packaging tool.

- [Tree Shaking in rollup.js](https://rollupjs.org/guide/en/#tree-shaking)
- [Tree Shaking in Webpack](https://webpack.js.org/guides/tree-shaking/)

If your current development environment does not support `Tree Shaking`, you can use the following 2 methods.

## Manually import

Manual import requires only importing the files used when writing the code, such as using only the `<Button>` component:

```js
import Button from 'rsuite/Button';
```

Import the corresponding style file:

```diff
import Button from 'rsuite/Button';
+ import 'rsuite/Button/styles';  // import default style less
```

You can also import the specified theme style:

```diff
import Button from 'rsuite/Button';
+ import 'rsuite/Button/styles/themes/dark';  // import dark theme less
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

[config-reset-import]: /en/guide/themes#disable-html-styles-reset
