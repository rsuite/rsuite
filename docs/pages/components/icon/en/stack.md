### Stack

<!--start-code-->

```js
const instance = (
  <div className="icon-example-list">
    <IconStack size="lg">
      <Icon icon="square" stack="2x" />
      <Icon icon="terminal" stack="1x" inverse />
    </IconStack>
    <IconStack size="lg">
      <Icon icon="camera" stack="1x" />
      <Icon icon="ban" stack="2x" style={{ color: '#f44336' }} />
    </IconStack>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
