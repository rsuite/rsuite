### 触发事件

`Whisper` 提供了一个 `trigger` 属性，用于在各种场景下控制 `Popover` 显示。属性值包括：

- `click`: 当用户点击元素时会被触发，再点击会关闭。
- `focus`: 当用户点击或触摸元素或通过键盘的 `tab` 键选择它时会被触发。
- `hover`: 鼠标悬停到元素上时触发，鼠标离开则关闭。
- `active`: 激活元素时会被触发。
- `none`: 无触发事件，一般用于需要通过方法触发时候使用。

<!--start-code-->

```js
const speaker = (
  <Popover title="Title">
    <p>This is a defalut Popover </p>
    <p>Content</p>
    <p>
      <a>link</a>
    </p>
  </Popover>
);

const TriggerMethod = () => {
  const triggerRef = React.createRef();
  const open = () => triggerRef.current.open();
  const close = () => triggerRef.current.close();

  return (
    <div>
      <Whisper placement="top" speaker={speaker} ref={triggerRef} trigger="none">
        <span>Click the `Open` and `Close` buttons.</span>
      </Whisper>
      <hr />
      <ButtonToolbar>
        <Button onClick={open}>Open</Button>
        <Button onClick={close}>Close</Button>
      </ButtonToolbar>
    </div>
  );
};

const App = () => (
  <div>
    <ButtonToolbar>
      <Whisper placement="top" trigger="click" speaker={speaker}>
        <Button>Click</Button>
      </Whisper>
      <Whisper placement="top" trigger="focus" speaker={speaker}>
        <Button>Focus</Button>
      </Whisper>
      <Whisper placement="top" trigger="active" speaker={speaker}>
        <Button>Active</Button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={speaker}>
        <Button>Hover</Button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={speaker} enterable>
        <Button>Hover + Enterable</Button>
      </Whisper>
    </ButtonToolbar>
    <hr />
    <TriggerMethod />
  </div>
);

ReactDOM.render(<App />);
```

<!--end-code-->

> 注意: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
