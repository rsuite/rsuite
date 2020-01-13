### Custom Icon

Custom Icon to render an externally-introduced SVG file.

<!--start-code-->

```js
/**
 * import * as SvgIcons from '@/components/SvgIcons'
 * import IconLogo from '@/resources/images/logo.svg';
 * IconLogo, SvgIcons is external resources.
 */

const instance = (
  <div className="icon-example-list">
    <Icon icon={IconLogo} size="lg" />
    <Icon icon={SvgIcons.guide} size="lg" />
    <Icon icon={SvgIcons.component} size="lg" />
    <Icon icon={SvgIcons.tools} size="lg" />
    <Icon icon={SvgIcons.search} size="lg" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->

You also need to configure SVG loader in webpack to use [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

```js
{
  test: /\.svg$/,
  use: [{
    loader: 'svg-sprite-loader',
    options: {
      symbolId: 'icon-[name]'
    }
  }]
}
```
