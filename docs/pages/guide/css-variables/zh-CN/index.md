# CSS 变量

现在所有现代浏览器都支持 CSS 变量。 在 React Suite 中，我们使用 CSS 变量来定义组件的样式， 你可以通过覆盖 CSS 变量来自定义组件的样式。

## Shadow DOM

在每个渲染 RSuite 组件的 Shadow Root 内加载 RSuite 样式表。样式表会在宿主元素上提供默认样式变量。如需深色或高对比度主题，在 Shadow Root 内包裹组件的元素上设置 `data-theme="dark"` 或 `data-theme="high-contrast"`。

完整样式表也会为 Shadow Root 内的内容设置可继承的文字样式。

使用 Vite 时，可以通过 `?inline` 将样式表作为文本加载。以下示例中的 `host` 是宿主元素。

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
createRoot(mount).render(<Button appearance="primary">保存</Button>);
```

对于通过 Portal 渲染弹层的组件，将 `container` 指向同一主题容器内的元素，让弹层留在 Shadow Root 内并应用其中的样式。

[Web Component 示例](https://github.com/rsuite/rsuite/tree/main/examples/with-web-component) 演示了如何为 SelectPicker 隔离主题和弹层。

<div id="ad-view"></div>
