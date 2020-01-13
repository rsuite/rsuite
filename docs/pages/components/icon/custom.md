### 自定义 Icon

自定义 Icon, 可以渲染一个外部引入的 svg 文件。

<!--start-code-->

```js
/**
 * import * as SvgIcons from '@/components/SvgIcons'
 * import IconLogo from '@/resources/images/logo.svg';
 * IconLogo, SvgIcons 是 import 的外部资源。
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

同时需要在 webpack 中配置 svg loader, 这里用到一个 [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)

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
