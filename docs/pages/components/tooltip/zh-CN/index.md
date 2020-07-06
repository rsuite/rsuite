# Tooltip 文字提示

用于辅助的文字提示，可代替 HTML 元素默认的 title 属性。

- `<Tooltip>` 文字提示。
- `<Whisper>` 监听触发器，包裹被监听对象的外面，触发事件后通知到 `<Tooltip>` 展示出来。

## 获取组件

```js
import { Tooltip, Whisper } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Tooltip>`

| 属性名称    | 类型 `(默认值)`      | 描述              |
| ----------- | -------------------- | ----------------- |
| children \* | React.Node           | 组件的内容        |
| classPrefix | string `('tooltip')` | 组件 CSS 类的前缀 |
| visible     | boolean              | 组件默认可见的    |

### `<Whisper>`

| 属性名称        | 类型 `(默认值)`                                                          | 描述                            |     |
| --------------- | ------------------------------------------------------------------------ | ------------------------------- | --- |
| container       | HTMLElement or (() => HTMLElement)                                       | 设置渲染的容器                  |
| delay           | number                                                                   | 延迟时间                        |     |
| delayHide       | number                                                                   | 隐藏的延迟时间                  |     |
| delayShow       | number                                                                   | 展示的延迟时间                  |     |
| onBlur          | () => void                                                               | 失去焦点回调函数                |     |
| onClick         | () => void                                                               | 点击的回调函数                  |     |
| onEnter         | () => void                                                               | 显示前动画过渡的回调函数        |
| onEntered       | () => void                                                               | 显示后动画过渡的回调函数        |
| onEntering      | () => void                                                               | 显示中动画过渡的回调函数        |
| onExit          | () => void                                                               | 退出前动画过渡的回调函数        |
| onExited        | () => void                                                               | 退出后动画过渡的回调函数        |
| onExiting       | () => void                                                               | 退出中动画过渡的回调函数        |
| onFocus         | () => void                                                               | 获取焦点的回调函数              |     |
| onMouseOut      | () => void                                                               | 鼠标离开的回调函数              |     |
| placement       | enum: [PlacementAll](#types) `('right')`                                 | 显示位置                        |     |
| preventOverflow | boolean                                                                  | 防止浮动元素溢出                |
| speaker \*      | union: Tooltip, Popover                                                  | 展示的元素                      |     |
| trigger         | union: 'click', 'hover', 'focus', 'active', 'none' `(['hover','focus'])` | 触发事件,可以通过数组配置多事件 |     |

### Whisper methods

- open

显示一个 Tooltip。

```ts
open: (delay?: number) => void
```

- close

隐藏一个 Tooltip。

```ts
close: (delay?: number) => void
```

## 相关组件

- [`<Popover>`](./popover) 弹出框
- [`<Message>`](./message) 消息框
- [`<Alert`>](./alert) 提醒框
- [`<Notification>`](./notification) 通知框
