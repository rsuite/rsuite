### `<Whisper>`

| 属性名称        | 类型 `(默认值)`                                        | 描述                                                                       |
| --------------- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| container       | HTMLElement \| (() => HTMLElement)                     | 设置渲染的容器                                                             |
| controlId       | string                                                 | 设置 `id` 到 `<Overlay>` 上，并且设置 `aria-describedby` 到 `<Whisper>` 上 |
| defaultOpen     | boolean                                                | 默认是否显示浮层                                                           |
| delay           | number                                                 | 交互延迟时间 (毫秒)                                                        |
| delayClose      | number                                                 | 关闭延迟时间 (毫秒)                                                        |
| delayOpen       | number                                                 | 打开延迟时间 (毫秒)                                                        |
| enterable       | boolean                                                | 当 `trigger` 为 `hover` 时，鼠标是否可以进入浮层内部                       |
| followCursor    | boolean                                                | 是否启用浮层跟随光标                                                       |
| onBlur          | () => void                                             | 失去焦点时的回调函数                                                       |
| onClick         | () => void                                             | 点击时的回调函数                                                           |
| onClose         | () => void                                             | 浮层关闭时的回调函数                                                       |
| onEnter         | () => void                                             | 浮层显示前过渡动画的回调函数                                               |
| onEntered       | () => void                                             | 浮层显示后过渡动画完成的回调函数                                           |
| onEntering      | () => void                                             | 浮层显示中过渡动画的回调函数                                               |
| onExit          | () => void                                             | 浮层退出前过渡动画的回调函数                                               |
| onExited        | () => void                                             | 浮层退出后过渡动画完成的回调函数                                           |
| onExiting       | () => void                                             | 浮层退出中过渡动画的回调函数                                               |
| onFocus         | () => void                                             | 获取焦点时的回调函数                                                       |
| onOpen          | () => void                                             | 浮层打开时的回调函数                                                       |
| open            | boolean                                                | 手动控制浮层是否显示                                                       |
| placement       | [Placement](#code-ts-placement-code) `('right')`       | 浮层显示位置                                                               |
| preventOverflow | boolean                                                | 防止浮层溢出容器边界                                                       |
| speaker \*      | Tooltip \| Popover \| ReactElement                     | 要显示的浮层组件                                                           |
| trigger         | [Trigger](#code-ts-trigger-code) `(['hover','focus'])` | 触发浮层显示的事件，支持数组配置多个事件                                   |

### Whisper 方法

Whisper 提供了几个可以通过 `ref` 调用的方法，用于以编程方式控制浮层的显示和位置。这些方法在需要手动触发浮层操作时非常有用，例如：

- 根据业务逻辑显示/隐藏提示
- 在内容变化后更新浮层位置
- 创建自定义的交互逻辑

通过 `ref` 获取组件实例：

```jsx
const whisperRef = useRef();

<Whisper ref={whisperRef} {...}>
  <Button>悬停查看</Button>
</Whisper>
```

| 方法名         | 类型定义                   | 说明                                                  |
| -------------- | -------------------------- | ----------------------------------------------------- |
| open           | `(delay?: number) => void` | 手动打开浮层，可选的 `delay` 参数指定延迟时间（毫秒） |
| close          | `(delay?: number) => void` | 手动关闭浮层，可选的 `delay` 参数指定延迟时间（毫秒） |
| updatePosition | `() => void`               | 当内容变化导致布局改变时，手动更新浮层位置            |

```jsx
// 在按钮点击时打开浮层
<Button onClick={() => whisperRef.current?.open()}>显示提示</Button>;

// 在数据加载完成后显示浮层
useEffect(() => {
  if (dataLoaded) {
    whisperRef.current?.open(300); // 300ms 后显示
  }
}, [dataLoaded]);

// 内容变化后更新浮层位置
const handleResize = useCallback(() => {
  whisperRef.current?.updatePosition();
}, []);
```

### 类型定义

#### `ts:Trigger`

```ts
type Trigger =
  | Array<'click' | 'contextMenu' | 'hover' | 'focus' | 'active'>
  | 'click'
  | 'contextMenu'
  | 'hover'
  | 'focus'
  | 'active'
  | 'none';
```
