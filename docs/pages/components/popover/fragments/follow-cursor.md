<!--start-code-->

```js
const instance = (
  <Whisper
    followCursor
    speaker={
      <Popover>This is a ToolTip for simple text hints. It can replace the title property</Popover>
    }
  >
    <Button>Hover me</Button>
  </Whisper>
);

ReactDOM.render(instance);
```

<!--end-code-->
