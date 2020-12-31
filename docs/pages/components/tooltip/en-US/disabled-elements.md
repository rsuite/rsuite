### Disabled elements

Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you’ll want to trigger the overlay from a wrapper `<div>` or `<span>` and override the pointer-events on the disabled element.

<!--start-code-->

```js
const instance = (
  <Whisper speaker={<Tooltip> Tooltip!</Tooltip>}>
    <span>
      <Button disabled style={{ pointerEvents: 'none' }}>button</Button>
    </span>
  </Whisper>
);
ReactDOM.render(instance);
```

<!--end-code-->
