### 设置 SVG 图标的颜色

如果您需要 svg 图标颜色与文字颜色一致，可以使用 [currentColor](https://caniuse.com/#search=currentColor)以确保您的 `fill`、 `strocke` 颜色与字体颜色保持一致。如果您使用了 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)，则应对 `use` 元素设置 `currentColor`。

<!--start-code-->

```js
/**
 * import * as SvgIcons from '@/components/SvgIcons'
 * SvgIcons 是 import 的外部资源。
 *
 * <style>
 *   .rs-icon.fill-color use{
 *       fill: currentColor;
 *   }
 * </style>
 */

const instance = (
  <IconButton
    appearance="ghost"
    icon={<Icon className="fill-color" icon={SvgIcons.Search} size="lg" />}
    size="lg"
  >
    Search
  </IconButton>
);
ReactDOM.render(instance);
```

<!--end-code-->
