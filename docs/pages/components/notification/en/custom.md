### Custom

<!--start-code-->

```js
function open() {
  Notification.open({
    title: 'Message',
    duration: 10000,
    description: (
      <div>
        <p>Simon wants to add you as a friend .</p>
        <ButtonToolbar>
          <Button>Accept</Button>
          <Button>Cancel</Button>
        </ButtonToolbar>
      </div>
    )
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
