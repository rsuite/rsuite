### 默认

<!--start-code-->

```js
const instance = (
  <ButtonToolbar>
    <Button onClick={() => Alert.info('This is a informations.')}> Info </Button>
    <Button onClick={() => Alert.success('This is a successful message.')}> Success </Button>
    <Button onClick={() => Alert.warning('This is a warning notice.')}> Warning </Button>
    <Button onClick={() => Alert.error('This is an error message.')}> Error </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
