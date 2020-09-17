### Triggering events

`Whisper` provides a `trigger` props, which is used to control the display of `Popover` in different business scenarios. Props values ​​include:

- `click`: It will be triggered when the element is clicked, and closed when clicked again.
- `focus`: It is generally triggered when the user clicks or taps on an element or selects it with the keyboard's `tab` key.
- `hover`: Will be triggered when the cursor (mouse pointer) is hovering over the element.
- `active`: It is triggered when the element is activated.
- `none`: No trigger event, generally used when it needs to be triggered by a method.

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

> Note: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
