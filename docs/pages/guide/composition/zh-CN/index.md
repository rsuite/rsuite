# 组件封装

React Suite 一直在组件的灵活性与简易性之间寻找平衡，让组件封装尽可能的简单灵活。

## 组件属性

### `as` 属性

React Suite 中的所有 UI 组件都提供了一个 `as` 属性，可以更改将被渲染的根元素。

```jsx
return (
  <>
    {/* Will output: <header class="rs-header" /> */}
    <Header />
    {/* Uses div tag: <div class="rs-header" /> */}
    <Header as="div" />;
  </>
);
```

### 未定义的 props 与 DOM 属性

我们的组件仅处理在其 `propTypes` 中定义的 `prop`，所有未处理的 `prop` 都将传递到组件的根元素。 这意味着所有组件都支持所有 HTML DOM 属性。

```jsx
return (
  <>
    <Input tabIndex={1} onFocus={e => console.log(e)} />
  </>
);
```

## 第三方路由库

React Suite 的导航组件支持 `as` 属性， 用于接收一个第三方路由库的组件类型。 包含的组件: `Dropdown`，`Breadcrumb`，`Nav`。

### `next/link`

```jsx
import Link from 'next/link';

<Nav.Item as={Link} href="/about">
  About
</Nav.Item>;

<Breadcrumb.Item as={Link} href="/about">
  About
</Breadcrumb.Item>;

<Dropdown.Item as={Link} href="/about">
  About
</Dropdown.Item>;
```

### `react-router-dom`

```jsx
import { Link } from 'react-router-dom';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

return (
  <Nav.Item as={NavLink} href="/">
    Home
  </Nav.Item>
);
```

## 注意事项

### 使用 refs 时的一些注意事项

某些组件需要访问 DOM 节点，之前是通过使用 `ReactDOM.findDOMNode` 就能实现，但是该方法已被废弃，代替的是使用 `ref` 。 当需要对组件进行封装的时候，需要通过 `React.forwardRef` 把 ref 传递给被封装的组件，否则就会出现以下错误:

```
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
```

自定义 Popover 的示例:

```diff
- const CustomPopover = ()=>(
+ const CustomPopover = React.forwardRef((props, ref) => (
  <div>
    <Popover ref={ref} {...props}>
      content
    </Popover>
  </div>
));

return <Whisper speaker={<CustomPopover />}>open</Whisper>;
```

## 常见问题

- [怎么实现一个 Card 组件？](/zh/components/panel#卡片)
- [怎么自定义一个弹窗?](/zh/components/whisper)
- [怎么组合 Popover 与 Dropdown ?](/zh/components/dropdown#used-with-popover)
