# Animation 动画

动画组件，提供了一些常用的动画效果，可以通过配置相关属性来实现动画效果。

## 获取组件

<!--{include:<import-guide>}-->

- `Animation.Fade` 淡入淡出过渡效果。
- `Animation.Collapse` 折叠过渡效果。
- `Animation.Bounce`弹入弹出过渡效果。
- `Animation.Slide` 滑入滑出过渡效果。
- `Animation.Transition` 自定义一个过渡效果。

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

### 减少动态效果

`Animation.Fade`、`Animation.Collapse`、`Animation.Bounce`、`Animation.Slide` 和 `Animation.Transition` 默认遵循系统的 `prefers-reduced-motion` 设置。将 `reduceMotion` 设为 `true` 可禁用动态效果；设为 `false` 可显式允许动画，包括系统要求减少动态效果时。

```jsx
<Animation.Fade in><div>遵循系统偏好。</div></Animation.Fade>
<Animation.Bounce in reduceMotion><div>减少动态效果。</div></Animation.Bounce>
<Animation.Slide in reduceMotion={false}><div>允许动画。</div></Animation.Slide>
```

组件设置优先于 `CustomProvider reduceMotion`，全局设置优先于系统偏好。通过 `CustomProvider components` 配置的组件默认值遵循现有的默认属性合并规则。

减少动态效果时，仍会依次调用 `onEnter`、`onEntering`、`onEntered` 及对应的退出回调，无需等待 CSS 完成事件或 `timeout`。过渡期间启用此设置会完成当前请求；恢复动画仅影响下一次进入或退出，不会重播已完成的动画。

该设置仅移除动画节点自身的 CSS 过渡时长，并将 CSS 动画减少为零时长、零延迟的一次迭代。包括自定义循环动画在内，最终样式仍由 keyframes、动画方向及 fill mode 决定。不影响嵌套内容及其他动画。使用渲染函数作为 children 时，需要将提供的 props 和 ref 传给动画节点。服务端渲染的自动策略通过 CSS 在 hydration 前遵循系统偏好。

## Props

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
| reduceMotion      | boolean                              | 减少动态效果；未设置时遵循全局设置或系统偏好 |
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
| reduceMotion      | boolean                              | 减少动态效果；未设置时遵循全局设置或系统偏好 |
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
| reduceMotion      | boolean                              | 减少动态效果；未设置时遵循全局设置或系统偏好 |
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
| reduceMotion      | boolean                              | 减少动态效果；未设置时遵循全局设置或系统偏好 |
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
| reduceMotion      | boolean                              | 减少动态效果；未设置时遵循全局设置或系统偏好 |
| timeout           | number `(1000)`                      | 动画过渡延迟时间           |
| transitionAppear  | boolean                              | 初始显示的时候开启过渡效果 |
| unmountOnExit     | boolean                              | 在退出时卸载组件           |

<!--{include:(_common/types/placement4.md)}-->
