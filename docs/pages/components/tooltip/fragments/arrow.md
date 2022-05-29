<!--start-code-->

```js
const instance = (
  <Whisper
    placement="top"
    trigger="click"
    speaker={<Tooltip arrow={false}>This is a Tooltip without arrow indicator</Tooltip>}
  >
    <Button>Click</Button>
  </Whisper>
);

ReactDOM.render(instance);
```

<!--end-code-->
