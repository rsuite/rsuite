# Animation 动画

动画组件，提供了一些常用的动画效果，可以通过配置相关属性来实现动画效果。

## 获取组件

<!--{include:<import-guide>}-->

- `<Animation.Fade>` 淡入淡出过渡效果。
- `<Animation.Collapse>` 折叠过渡效果。
- `<Animation.Bounce>`弹入弹出过渡效果。
- `<Animation.Slide>` 滑入滑出过渡效果。
- `<Animation.Transition>` 自定义一个过渡效果。

## 演示

### Fade 淡进淡出

<!--{include:`fade.md`}-->

### Collapse 折叠展开

<!--{include:`collapse.md`}-->

### Bounce 弹入弹出

<!--{include:`bounce.md`}-->

### Slide 滑入滑出

<!--{include:`slide.md`}-->

### Transition 自定义过渡效果

在 Transition 中配置以下 className, 然后自定义相关 css 动画处理。

```
exitedClassName="custom-exited"
exitingClassName="custom-exiting"
enteredClassName="custom-entered"
enteringClassName="custom-entering"
```

<!--{include:`transition.md`}-->

## Props

<!--{include:(_common/types/placement4.md)}-->

### `<Animation.Fade>`

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

### `<Animation.Collapse>`

| 属性名称          | 类型 `(默认值)`                                          | 描述                       |
| ----------------- | -------------------------------------------------------- | -------------------------- |
| dimension         | 'height'&#124;'width'&#124;() => ('height'&#124;'width') | 设置折叠尺寸类型           |
| enteredClassName  | string `('collapse in')`                                 | 进入动画过渡后 className   |
| enteringClassName | string `('collapsing')`                                  | 进入动画过渡中 className   |
| exitedClassName   | string `('collapse')`                                    | 退出动画过渡后 className   |
| exitingClassName  | string `('collapsing')`                                  | 退出动画过渡中 className   |
| getDimensionValue | () => number                                             | 自定义尺寸值               |
| in \*             | boolean                                                  | 进入                       |
| onEnter           | (node?: null, Element, Text) => void                     | 显示前动画过渡的回调函数   |
| onEntered         | (node?: null, Element, Text) => void                     | 显示后动画过渡的回调函数   |
| onEntering        | (node?: null, Element, Text) => void                     | 显示中动画过渡的回调函数   |
| onExit            | (node?: null, Element, Text) => void                     | 退出前动画过渡的回调函数   |
| onExited          | (node?: null, Element, Text) => void                     | 退出后动画过渡的回调函数   |
| onExiting         | (node?: null, Element, Text) => void                     | 退出中动画过渡的回调函数   |
| role              | string                                                   | HTML role                  |
| timeout           | number`(300)`                                            | 动画过渡延迟时间           |
| transitionAppear  | boolean                                                  | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                                                  | 在退出时卸载组件           |

### `<Animation.Bounce>`

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

### `<Animation.Slide>`

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
| placement         | Placement `('right')`                | 动画出来的位置             |

### `<Animation.Transition>`

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
