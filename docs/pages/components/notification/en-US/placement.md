### Placement

<!--start-code-->

```js
function open(placement) {
  Notification.open({
    title: placement,
    placement,
    description: <Paragraph style={{ width: 320 }} rows={3} />
  });
}

const instance = (
  <ButtonToolbar>
    <Button onClick={() => open('topStart')}> Top Start </Button>
    <Button onClick={() => open('topEnd')}> Top End </Button>
    <Button onClick={() => open('bottomStart')}> Bottom Start </Button>
    <Button onClick={() => open('bottomEnd')}> Bottom End </Button>
  </ButtonToolbar>
);
ReactDOM.render(instance);
```

<!--end-code-->
