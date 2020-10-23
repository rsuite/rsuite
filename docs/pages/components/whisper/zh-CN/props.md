### `<Whisper>`

```ts
type Trigger =
  | Array<'click' | 'hover' | 'focus' | 'active'>
  | 'click'
  | 'hover'
  | 'focus'
  | 'active'
  | 'none';
```

| 属性名称        | 类型 `(默认值)`                           | 描述                                                                      |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------- |
| container       | HTMLElement &#124; (() => HTMLElement)    | 设置渲染的容器                                                            |
| controlId       | string                                    | 设置 `id` 到 `<Overlay>`上，并且设置 `aria-describedby` 到 `<Whisper>` 上 |
| delay           | number                                    | 延迟时间 (ms)                                                             |
| delayClose      | number                                    | 延迟关闭时间 (ms)                                                         |
| delayOpen       | number                                    | 延迟打开时间 (ms)                                                         |
| enterable       | boolean                                   | 当 `trigger` 值为 `hover`时候，鼠标是否可进入提示框浮层中                 |
| full            | boolean                                   | 撑满容器                                                                  |
| onBlur          | () => void                                | 失去焦点回调函数                                                          |
| onClick         | () => void                                | 点击的回调函数                                                            |
| onClose         | () => void                                | 关闭回调函数                                                              |
| onEnter         | () => void                                | 显示前动画过渡的回调函数                                                  |
| onEntered       | () => void                                | 显示后动画过渡的回调函数                                                  |
| onEntering      | () => void                                | 显示中动画过渡的回调函数                                                  |
| onExit          | () => void                                | 退出前动画过渡的回调函数                                                  |
| onExited        | () => void                                | 退出后动画过渡的回调函数                                                  |
| onExiting       | () => void                                | 退出中动画过渡的回调函数                                                  |
| onFocus         | () => void                                | 获取焦点的回调函数                                                        |
| onOpen          | () => void                                | 打开回调函数                                                              |
| placement       | Placement `('right')`                     | 显示位置                                                                  |
| preventOverflow | boolean                                   | 防止浮动元素溢出                                                          |
| speaker \*      | Tooltip &#124;Popover &#124; ReactElement | 展示的元素                                                                |
| trigger         | Trigger `(['hover','focus'])`             | 触发事件,可以通过数组配置多事件                                           |

### Whisper methods

- open

打开一个浮层

```ts
open: (delay?: number) => void
```

- close

关闭一个浮层

```ts
close: (delay?: number) => void
```

更新浮层位置

- updatePosition

```ts
updatePosition: () => void
```
