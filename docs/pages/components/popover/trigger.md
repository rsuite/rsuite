### 触发事件

有三种状态可以触发提示 `Popover` 的信息: `click`、`focus`、`hover`、`active`

<!--start-code-->

```js
const speaker = (
  <Popover title="Title">
    <p>This is a defalut Popover </p>
    <p>Content</p>
  </Popover>
);

class TriggerDemo extends React.Component {
  render() {
    return (
      <div>
        <Whisper
          placement="top"
          speaker={speaker}
          triggerRef={ref => {
            this.trigger = ref;
          }}
        >
          <span>Popover</span>
        </Whisper>
        <hr />
        <ButtonToolbar>
          <Button
            onClick={() => {
              this.trigger.show();
            }}
          >
            Trigger Show
          </Button>
          <Button
            onClick={() => {
              this.trigger.hide();
            }}
          >
            Trigger Hide
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

const instance = (
  <div>
    <ButtonToolbar>
      <Whisper placement="top" trigger="click" speaker={speaker}>
        <Button>Click</Button>
      </Whisper>
      <Whisper placement="top" trigger="focus" speaker={speaker}>
        <Button>Focus</Button>
      </Whisper>
      <Whisper placement="top" trigger="hover" speaker={speaker}>
        <Button>Hover</Button>
      </Whisper>
      <Whisper placement="top" trigger="active" speaker={speaker}>
        <Button>Active</Button>
      </Whisper>
    </ButtonToolbar>
    <hr />
    <TriggerDemo />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->

> 注意: [Safari ignoring tabindex](https://stackoverflow.com/questions/1848390/safari-ignoring-tabindex)
