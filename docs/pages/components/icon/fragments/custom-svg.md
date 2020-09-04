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
