### Close

<!--start-code-->

```js
function handleOpen() {
  Notification.open({
    title: 'Notify',
    description: <Paragraph width={320} rows={3} />
  });
}

function handleClose() {
  Notification.close();
}

function handleCloseAll() {
  Notification.closeAll();
}

const instance = (
  <ButtonToolbar>
    <Button onClick={handleOpen}> Open </Button>
    <Button onClick={handleClose}> Close </Button>
    <Button onClick={handleCloseAll}> Close all</Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
