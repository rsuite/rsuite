# 样式属性 (Style Props)

React Suite 提供了一系列样式属性简写，可以更简洁地设置常用样式。这些属性直接映射到对应的 CSS 属性。

## 使用方式

### 主题值

提供的主题预设值，例如：

```jsx
<Box bg='blue.600' />
<Box rounded='lg' />
```

### 响应式值

提供的响应式值，例如：

```jsx
<Box w={{ xs: '100%', md: '80%', lg: '60%' }} />
<Box p={{ xs: '10px', md: '20px' }} />
```

## 服务端渲染样式

使用 `StyleRegistry` 将样式属性生成的 CSS 写入服务端 HTML，使浏览器在 JavaScript 加载之前即可应用这些样式。为每个服务端请求创建新的注册表，服务端渲染和客户端水合使用同一组件树。

将组件放在 `app.tsx` 中。

```tsx
import React from 'react';
import { Box } from 'rsuite';

export default function App() {
  return (
    <Box c="#123456" p={{ xs: '8px', md: '16px' }}>
      Responsive content
    </Box>
  );
}
```

在服务端入口中，先渲染应用，再从注册表读取样式。将收集到的样式元素放到文档的 head 中。通过构建工具将下方的浏览器入口编译为 `/client.js`。

```tsx
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StyleRegistry, createStyleRegistry } from 'rsuite';
import App from './app';

export function renderPage() {
  const registry = createStyleRegistry();
  const markup = renderToString(
    <StyleRegistry registry={registry}>
      <App />
    </StyleRegistry>
  );
  const collected = registry.getStyleElement();
  const styles = collected ? renderToStaticMarkup(collected) : '';

  return `<!doctype html>
<html lang="en">
  <head><meta name="viewport" content="width=device-width, initial-scale=1">${styles}</head>
  <body>
    <div id="root">${markup}</div>
    <script type="module" src="/client.js"></script>
  </body>
</html>`;
}
```

在浏览器入口 `client.tsx` 中，为水合后的根节点保留同一个注册表实例。该实例会接管服务端写入的样式规则。

```tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { StyleRegistry, createStyleRegistry } from 'rsuite';
import App from './app';

const registry = createStyleRegistry();
const root = document.getElementById('root');

if (root) {
  hydrateRoot(
    root,
    <StyleRegistry registry={registry}>
      <App />
    </StyleRegistry>
  );
}
```

组件样式和主题变量仍由 React Suite 样式表提供，按原方式引入即可。使用流式服务端渲染时，通过框架的样式插入钩子在对应内容之前输出 `registry.getStyleElement()`，每批样式插入后调用 `registry.flush()`。如果使用内容安全策略，在服务端渲染和客户端水合时将当前请求的 nonce 通过 `csp={{ nonce }}` 传给 `CustomProvider`。

## 样式属性参考

| 属性      | CSS 属性               | 主题值                      |
| --------- | ---------------------- | --------------------------- |
| `p`       | `padding`              | -                           |
| `pt`      | `paddingTop`           | -                           |
| `pr`      | `paddingRight`         | -                           |
| `pb`      | `paddingBottom`        | -                           |
| `pl`      | `paddingLeft`          | -                           |
| `px`      | `paddingInline`        | -                           |
| `py`      | `paddingBlock`         | -                           |
| `ps`      | `paddingInlineStart`   | -                           |
| `pe`      | `paddingInlineEnd`     | -                           |
| `m`       | `margin`               | -                           |
| `mt`      | `marginTop`            | -                           |
| `mr`      | `marginRight`          | -                           |
| `mb`      | `marginBottom`         | -                           |
| `ml`      | `marginLeft`           | -                           |
| `mx`      | `marginInline`         | -                           |
| `my`      | `marginBlock`          | -                           |
| `ms`      | `marginInlineStart`    | -                           |
| `me`      | `marginInlineEnd`      | -                           |
| `w`       | `width`                | -                           |
| `h`       | `height`               | -                           |
| `minw`    | `minWidth`             | -                           |
| `maxw`    | `maxWidth`             | -                           |
| `minh`    | `minHeight`            | -                           |
| `maxh`    | `maxHeight`            | -                           |
| `display` | `display`              | -                           |
| `pos`     | `position`             | -                           |
| `left`    | `left`                 | -                           |
| `top`     | `top`                  | -                           |
| `right`   | `right`                | -                           |
| `bottom`  | `bottom`               | -                           |
| `inset`   | `inset`                | -                           |
| `insetx`  | `insetInline`          | -                           |
| `insety`  | `insetBlock`           | -                           |
| `bsz`     | `boxSizing`            | -                           |
| `z`       | `zIndex`               | -                           |
| `bg`      | `background`           | [ColorScheme][color-scheme] |
| `bgc`     | `backgroundColor`      | [ColorScheme][color-scheme] |
| `bgi`     | `backgroundImage`      | -                           |
| `bga`     | `backgroundAttachment` | -                           |
| `bgp`     | `backgroundPosition`   | -                           |
| `bgsz`    | `backgroundSize`       | -                           |
| `bgr`     | `backgroundRepeat`     | -                           |
| `c`       | `color`                | [ColorScheme][color-scheme] |
| `ff`      | `fontFamily`           | -                           |
| `fs`      | `fontSize`             | -                           |
| `fw`      | `fontWeight`           | -                           |
| `ta`      | `textAlign`            | -                           |
| `tt`      | `textTransform`        | -                           |
| `td`      | `textDecoration`       | -                           |
| `tds`     | `textDecorationStyle`  | -                           |
| `tdc`     | `textDecorationColor`  | [ColorScheme][color-scheme] |
| `lts`     | `letterSpacing`        | -                           |
| `lh`      | `lineHeight`           | -                           |
| `bd`      | `border`               | -                           |
| `bs`      | `borderStyle`          | -                           |
| `bc`      | `borderColor`          | [ColorScheme][color-scheme] |
| `bw`      | `borderWidth`          | -                           |
| `bdt`     | `borderTop`            | -                           |
| `bdb`     | `borderBottom`         | -                           |
| `bdl`     | `borderLeft`           | -                           |
| `bdr`     | `borderRight`          | -                           |
| `bdts`    | `borderTopStyle`       | -                           |
| `bdbs`    | `borderBottomStyle`    | -                           |
| `bdls`    | `borderLeftStyle`      | -                           |
| `bdrs`    | `borderRightStyle`     | -                           |
| `bdtc`    | `borderTopColor`       | [ColorScheme][color-scheme] |
| `bdbc`    | `borderBottomColor`    | [ColorScheme][color-scheme] |
| `bdlc`    | `borderLeftColor`      | [ColorScheme][color-scheme] |
| `bdrc`    | `borderRightColor`     | [ColorScheme][color-scheme] |
| `bdtw`    | `borderTopWidth`       | -                           |
| `bdbw`    | `borderBottomWidth`    | -                           |
| `bdlw`    | `borderLeftWidth`      | -                           |
| `bdrw`    | `borderRightWidth`     | -                           |
| `rounded` | `borderRadius`         | [Size][size]                |
| `shadow`  | `boxShadow`            | [Size][size]                |
| `opacity` | `opacity`              | -                           |
| `spacing` | `gap`                  | -                           |
| `gap`     | `gap`                  | -                           |
| `rowgap`  | `rowGap`               | -                           |
| `colgap`  | `columnGap`            | -                           |
| `align`   | `alignItems`           | -                           |
| `justify` | `justifyContent`       | -                           |
| `self`    | `alignSelf`            | -                           |
| `basis`   | `flexBasis`            | -                           |
| `flex`    | `flex`                 | -                           |
| `grow`    | `flexGrow`             | -                           |
| `order`   | `order`                | -                           |
| `shrink`  | `flexShrink`           | -                           |

### 类型定义

<!--{include:(_common/types/breakpoints.md)}-->
<!--{include:(_common/types/size.md)}-->
<!--{include:(_common/types/color-scheme.md)}-->

[breakpoints]: #code-ts-breakpoints-code
[size]: #code-ts-size-code
[color-scheme]: #code-ts-color-scheme-code
