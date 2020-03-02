### Default

<!--start-code-->

```js
function open() {
  Notification.open({
    title: 'Notify',
    description: <Paragraph width={320} rows={3} />
  });
}

const instance = (
  <ButtonToolbar>
    <Button onClick={open}> Open </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
