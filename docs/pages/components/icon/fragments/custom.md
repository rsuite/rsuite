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
    <Icon icon={SvgIcons.Guide} size="lg" />
    <Icon icon={SvgIcons.Component} size="lg" />
    <Icon icon={SvgIcons.Tools} size="lg" />
    <Icon icon={SvgIcons.Search} size="lg" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
