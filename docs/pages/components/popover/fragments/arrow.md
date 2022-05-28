<!--start-code-->

```js
const instance = (
  <Whisper
    placement="top"
    trigger="click"
    speaker={
      <Popover arrow={false}>
        This is a ToolTip for simple text hints. It can replace the title property
      </Popover>
    }
  >
    <Button>Click</Button>
  </Whisper>
);

ReactDOM.render(instance);
```

<!--end-code-->
