### Triggering events

There are three kinds of events that can trigger the message `tooltip`: `click`、`focus`、`hover`、`active`

<!--start-code-->

```js
const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i> .
  </Tooltip>
);
const instance = (
  <ButtonToolbar>
    <Whisper placement="top" trigger="click" speaker={tooltip}>
      <Button>Click</Button>
    </Whisper>
    <Whisper placement="top" trigger="focus" speaker={tooltip}>
      <Button>Focus</Button>
    </Whisper>
    <Whisper placement="top" trigger="hover" speaker={tooltip}>
      <Button>Hover</Button>
    </Whisper>
    <Whisper placement="top" trigger="active" speaker={tooltip}>
      <Button>Active</Button>
    </Whisper>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->

> Note: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
