# Quick Start ⚡️

Before you start using it, you need to master at least the basics of front-end development and the core concepts of React. If you encounter problems during the learning process, you can discuss them in the [developer community][gitter-home].

## 1. Install

To install rsuite, run one of the following commands in your terminal:

<!--{include:<install-guide>}-->

## 2. Usage

The following is a simple example of using a default button component.

```jsx
import { Button } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function App() {
  return <Button>Hello World</Button>;
}
```

### 2.1. Without CSS Reset (Optional)

`rsuite.min.css` includes a [CSS reset](/guide/css-reset/). If you want to use your own CSS reset, you can import the `rsuite-no-reset.min.css` file instead.

```diff
- import 'rsuite/dist/rsuite.min.css';
+ import 'rsuite/dist/rsuite-no-reset.min.css';
```

### 2.2. Importing Component Styles on Demand (Optional)

If you only need the styles of some components, you can import the styles of the components on demand.

```jsx
// If you are using Less, import the `index.less` file.
import 'rsuite/Button/styles/index.css';
```

## Framework Guide

React Suite can be used in your favorite framework. We have prepared step-by-step guides for these frameworks:

<!--{include:<framework-guide>}-->

[gitter-home]: https://gitter.im/rsuite/rsuite
