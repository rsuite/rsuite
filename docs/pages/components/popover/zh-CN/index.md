# Popover 弹出框

鼠标点击/移入的时候，弹出的弹出框，用于显示更多内容。

- `<Popover>` 弹出框。
- `<Whisper>` 监听触发器，包裹被监听对象的外面，触发事件后通知到 `<Popover>` 展示出来。

## 获取组件

```js
import { Popover, Whisper } from 'rsuite';
```

## 演示

<!--{demo}-->

## Props

### `<Popover>`

| 属性名称    | 类型                 | 描述              |
| ----------- | -------------------- | ----------------- |
| children \* | React.Node           | 组件的内容        |
| classPrefix | string `('popover')` | 组件 CSS 类的前缀 |
| title       | React.Node           | 标题              |
| visible     | boolean              | 组件默认可见的    |

### `<Whisper>`

| 属性名称        | 类型 `(默认值)`                                                          | 描述                                                      |
| --------------- | ------------------------------------------------------------------------ | --------------------------------------------------------- |
| container       | HTMLElement or (() => HTMLElement)                                       | 设置渲染的容器                                            |
| delay           | number                                                                   | 延迟时间                                                  |
| delayHide       | number                                                                   | 隐藏的延迟时间                                            |
| delayShow       | number                                                                   | 展示的延迟时间                                            |
| enterable       | boolean                                                                  | 当 `trigger` 值为 `hover`时候，鼠标是否可进入提示框浮层中 |
| full            | boolean                                                                  | 撑满容器                                                  |
| onBlur          | () => void                                                               | 失去焦点回调函数                                          |
| onClick         | () => void                                                               | 点击的回调函数                                            |
| onClose         | () => void                                                               | 关闭回调函数                                              |
| onEnter         | () => void                                                               | 显示前动画过渡的回调函数                                  |
| onEntered       | () => void                                                               | 显示后动画过渡的回调函数                                  |
| onEntering      | () => void                                                               | 显示中动画过渡的回调函数                                  |
| onExit          | () => void                                                               | 退出前动画过渡的回调函数                                  |
| onExited        | () => void                                                               | 退出后动画过渡的回调函数                                  |
| onExiting       | () => void                                                               | 退出中动画过渡的回调函数                                  |
| onFocus         | () => void                                                               | 获取焦点的回调函数                                        |
| onMouseOut      | () => void                                                               | 鼠标离开的回调函数                                        |
| onOpen          | () => void                                                               | 打开回调函数                                              |
| placement       | enum: [PlacementAll](#types) `('right')`                                 | 显示位置                                                  |
| preventOverflow | boolean                                                                  | 防止浮动元素溢出                                          |
| speaker \*      | union: Tooltip, Popover                                                  | 展示的元素                                                |
| trigger         | union: 'click', 'hover', 'focus', 'active', 'none' `(['hover','focus'])` | 触发事件,可以通过数组配置多事件                           |
| triggerRef      | React.Ref                                                                | trigger 的 ref                                            |

### Whisper methods

- open

显示一个 Popover。

```ts
open: (delay?: number) => void
```

- close

隐藏一个 Popover。

```ts
close: (delay?: number) => void
```

## 相关组件

- [`<Tooltip>`](./tooltip) 文字提示
- [`<Message>`](./message) 消息框
- [`<Alert`>](./alert) 提醒框
- [`<Notification>`](./notification) 通知框
