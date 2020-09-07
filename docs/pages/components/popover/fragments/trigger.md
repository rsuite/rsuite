<!--start-code-->

```js
const speaker = (
  <Popover title="Title">
    <p>This is a default Popover </p>
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
