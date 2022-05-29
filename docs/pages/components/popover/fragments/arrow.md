<!--start-code-->

```js
const instance = (
  <Whisper
    placement="top"
    trigger="click"
    speaker={<Popover arrow={false}>This is a Popover without arrow indicator</Popover>}
  >
    <Button>Click</Button>
  </Whisper>
);

ReactDOM.render(instance);
```

<!--end-code-->
