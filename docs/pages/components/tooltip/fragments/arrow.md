<!--start-code-->

```js
const instance = (
  <Whisper
    placement="top"
    trigger="click"
    speaker={
      <Tooltip arrow={false}>
        This is a ToolTip for simple text hints. It can replace the title property
      </Tooltip>
    }
  >
    <Button>Click</Button>
  </Whisper>
);

ReactDOM.render(instance);
```

<!--end-code-->
