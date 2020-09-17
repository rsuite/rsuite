# Portal 入口

Portal 是将子级组件将追加到指定的容器中， 比如 Modal, Picker 等组件就需要把组件渲染到触发源 DOM 的外部。

在 React 16 中的提供了一个 `ReactDOM.createPortal()` 方法可以实现该功能, 如果您当前使用的是 React 版本是 15（或者 15 以下），那可以直接通过 Portal 组件来实现这个需求。

## 获取组件

```js
import { Portal } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Portal>`

| 属性名称   | 类型 `(默认值)`               | 描述             |
| ---------- | ----------------------------- | ---------------- |
| children   | React.Node                    | 子组件           |
| container  | HTMLElement,() => HTMLElement | 渲染子组件的容器 |
| onRendered | () => void                    | 渲染后的回调函数 |
