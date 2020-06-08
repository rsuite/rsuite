# Animation 动画

处理动画相关的组件

- `<Animation.Fade>` 淡入淡出过渡效果。
- `<Animation.Collapse>` 折叠过渡效果。
- `<Animation.Bounce>`弹入弹出过渡效果。
- `<Animation.Slide>` 滑入滑出过渡效果。
- `<Animation.Transition>` 自定义一个过渡效果。

当 Transition 无法满足业务需求时，可以试一试 [react-transition-group](https://github.com/reactjs/react-transition-group)

## 获取组件

```js
import { Animation } from 'rsuite';

const { Fade, Collapse, Transition } = Animation;
```

## 演示

<!--{demo}-->

## Props

### `<Fade>`

| 属性名称          | 类型 `(默认值)`                      | 描述                       |
| ----------------- | ------------------------------------ | -------------------------- |
| enteredClassName  | string                               | 进入动画过渡后 className   |
| enteringClassName | string                               | 进入动画过渡中 className   |
| exitedClassName   | string                               | 退出动画过渡后 className   |
| exitingClassName  | string                               | 退出动画过渡中 className   |
| in \*             | boolean                              | 进入                       |
| onEnter           | (node?: null, Element, Text) => void | 显示动画过渡的回调函数     |
| onEntered         | (node?: null, Element, Text) => void | 显示后动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void | 显示中动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void | 退出前动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void | 退出后动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void | 退出中动画过渡的回调函数   |
| timeout           | number `(300)`                       | 动画过渡延迟时间           |
| transitionAppear  | boolean                              | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                              | 在退出时卸载组件           |

### `<Collapse>`

| 属性名称          | 类型 `(默认值)`                                    | 描述                       |
| ----------------- | -------------------------------------------------- | -------------------------- |
| dimension         | union: 'height', 'width' () => ('height', 'width') | 设置折叠尺寸类型           |
| enteredClassName  | string `('collapse in')`                           | 进入动画过渡后 className   |
| enteringClassName | string `('collapsing')`                            | 进入动画过渡中 className   |
| exitedClassName   | string `('collapse')`                              | 退出动画过渡后 className   |
| exitingClassName  | string `('collapsing')`                            | 退出动画过渡中 className   |
| getDimensionValue | () => number                                       | 自定义尺寸值               |
| in \*             | boolean                                            | 进入                       |
| onEnter           | (node?: null, Element, Text) => void               | 显示前动画过渡的回调函数   |
| onEntered         | (node?: null, Element, Text) => void               | 显示后动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void               | 显示中动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void               | 退出前动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void               | 退出后动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void               | 退出中动画过渡的回调函数   |
| role              | string                                             | HTML role                  |
| timeout           | number`(300)`                                      | 动画过渡延迟时间           |
| transitionAppear  | boolean                                            | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                                            | 在退出时卸载组件           |

### `<Bounce>`

| 属性名称          | 类型 `(默认值)`                      | 描述                       |
| ----------------- | ------------------------------------ | -------------------------- |
| enteredClassName  | string                               | 进入动画过渡后 className   |
| enteringClassName | string                               | 进入动画过渡中 className   |
| exitedClassName   | string                               | 退出动画过渡后 className   |
| exitingClassName  | string                               | 退出动画过渡中 className   |
| in \*             | boolean                              | 进入                       |
| onEnter           | (node?: null, Element, Text) => void | 显示动画过渡的回调函数     |
| onEntered         | (node?: null, Element, Text) => void | 显示后动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void | 显示中动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void | 退出前动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void | 退出后动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void | 退出中动画过渡的回调函数   |
| timeout           | number `(300)`                       | 动画过渡延迟时间           |
| transitionAppear  | boolean                              | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                              | 在退出时卸载组件           |

### `<Slide>`

| 属性名称          | 类型 `(默认值)`                       | 描述                       |
| ----------------- | ------------------------------------- | -------------------------- |
| enteredClassName  | string                                | 进入动画过渡后 className   |
| enteringClassName | string                                | 进入动画过渡中 className   |
| exitedClassName   | string                                | 退出动画过渡后 className   |
| exitingClassName  | string                                | 退出动画过渡中 className   |
| in \*             | boolean                               | 进入                       |
| onEnter           | (node?: null, Element, Text) => void  | 显示动画过渡的回调函数     |
| onEntered         | (node?: null, Element, Text) => void  | 显示后动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void  | 显示中动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void  | 退出前动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void  | 退出后动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void  | 退出中动画过渡的回调函数   |
| timeout           | number `(300)`                        | 动画过渡延迟时间           |
| transitionAppear  | boolean                               | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                               | 在退出时卸载组件           |
| placement         | enum: [Placement4](#types)`('right')` | 动画出来的位置             |

### `<Transition>`

| 属性名称          | 类型 `(默认值)`                      | 描述                       |
| ----------------- | ------------------------------------ | -------------------------- |
| enteredClassName  | string                               | 进入动画过渡后 className   |
| enteringClassName | string                               | 进入动画过渡中 className   |
| exitedClassName   | string                               | 退出动画过渡后 className   |
| exitingClassName  | string                               | 退出动画过渡中 className   |
| in \*             | boolean                              | 进入                       |
| onEnter           | (node?: null, Element, Text) => void | 显示动画过渡的回调函数     |
| onEntered         | (node?: null, Element, Text) => void | 显示后动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void | 显示中动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void | 退出前动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void | 退出后动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void | 退出中动画过渡的回调函数   |
| timeout           | number `(1000)`                      | 动画过渡延迟时间           |
| transitionAppear  | boolean                              | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                              | 在退出时卸载组件           |
