# Quick Start ⚡️

Before you start using it, you need to master at least the basics of front-end development and the core concepts of React. If you encounter problems during the learning process, you can discuss them in the [developer community][gitter-home].

## Install

To install rsuite, run one of the following commands in your terminal:

<!--{include:<install-guide>}-->

## Examples

The following is a simple example of using a default button component.

```jsx
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {
  return <Button appearance="primary">Hello World</Button>;
}
```

### Without CSS Reset

`rsuite.min.css` includes a CSS reset. If you want to use your own CSS reset, you can import the `rsuite-no-reset.min.css` file instead.

```diff
- import 'rsuite/dist/rsuite.min.css';
+ import 'rsuite/dist/rsuite-no-reset.min.css';
```

## Online example

<iframe src="https://codesandbox.io/embed/k9v972q3lr" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

- [Use in create-react-app](/guide/use-with-create-react-app/)
- [Use in Next.js](/guide/use-next-app/)

[gitter-home]: https://gitter.im/rsuite/rsuite
