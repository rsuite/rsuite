### Svg icon color

If you need the svg icon color to match the text color, you can use [currentColor](https://caniuse.com/#search=currentColor) to ensure that your `fill`,`strocke` colors match the font color.If you used [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader), you should set `currentColor` for `use` element.

<!--start-code-->

```js
/**
 * import * as SvgIcons from '@/components/SvgIcons'
 * SvgIcons is external resources.
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
