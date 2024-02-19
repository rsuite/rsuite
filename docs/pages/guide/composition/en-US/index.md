# Composition

React Suite has always been looking for a balance between the flexibility and simplicity of components, making component packaging as simple and flexible as possible.

## Component prop

### `as` prop

All UI components in React Suite provide an `as` prop to change the root element to be rendered.

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

### Unhandled props & DOM attributes

Our component only processes the `prop` defined in its `propTypes`, all unprocessed `prop` will be passed to the root element of the component. This means that all components support all HTML DOM attributes.

```jsx
return (
  <>
    <Input tabIndex={1} onFocus={e => console.log(e)} />
  </>
);
```

## Third-party routing library

The navigation component of React Suite supports the `as` prop, which is used to receive the component type of a third-party routing library. Included components: `Dropdown`, `Breadcrumb`, `Nav`.

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

## Precautions

### Caveat with refs

Some components need to access the DOM node, which was previously achieved by using `ReactDOM.findDOMNode`, but this method has been deprecated and replaced with `ref`. When the component needs to be encapsulated, the ref needs to be passed to the encapsulated component through `React.forwardRef`, otherwise the following error will occur:

```
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
```

Example of custom Popover:

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

## FAQ?

- [How to implement a Card component?](/components/panel#card)
- [How to customize a popup?](/components/whisper)
- [How to combine Popover and Dropdown?](/components/dropdown#used-with-popover)
