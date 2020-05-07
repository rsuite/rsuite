### Disabled elements

Elements with the disabled attribute aren’t interactive, meaning users cannot hover or click them to trigger a popover (or tooltip). As a workaround, you’ll want to trigger the overlay from a wrapper `<div>` or `<span>`.

<!--start-code-->

```js
const instance = (
  <Whisper speaker={<Tooltip> Tooltip!</Tooltip>}>
    <span>
      <Button disabled>button</Button>
    </span>
  </Whisper>
);
ReactDOM.render(instance);
```

<!--end-code-->
