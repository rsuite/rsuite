# Custom `as` component refs (unreleased)

For components without their own imperative ref handle, ref support comes from the selected element or custom component. A plain function component whose props omit `ref` can be used with `as`, but does not gain ref support by being wrapped in `Box`, `Button` or `IconButton`.

```tsx
import React from 'react';
import { Button } from 'rsuite';

const Link = React.forwardRef<HTMLAnchorElement, { to: string; children?: React.ReactNode }>(
  ({ to, children }, ref) => (
    <a href={to} ref={ref}>
      {children}
    </a>
  )
);
const linkRef = React.createRef<HTMLAnchorElement>();

<Button as={Link} to="/docs" ref={linkRef}>
  Read documentation
</Button>;
```

For React 18, use a ref-forwarding component when the parent needs access to its DOM node. React 19 also supports an explicitly declared `ref` prop. See React's [forwarding refs](https://react.dev/reference/react/forwardRef) and [imperative handles](https://react.dev/reference/react/useImperativeHandle) documentation.

Native element refs, ref-forwarding components, class instances, explicitly declared ref props and component-owned imperative handles retain their existing types. Previously accepted refs to custom components that do not declare ref support now produce a TypeScript error. Runtime behavior is unchanged; production documentation remains on the published npm version until release.
