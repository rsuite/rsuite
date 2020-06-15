### Close

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Button onClick={() => Alert.info('This is a informations.')}>Open</Button>
    <Button onClick={() => Alert.close()}> Close </Button>
    <Button onClick={() => Alert.closeAll()}> Close all </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
