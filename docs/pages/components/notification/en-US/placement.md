### Placement

<!--start-code-->

```js
const Message = React.forwardRef(({ type, ...rest }, ref) => {
  return (
    <Notification ref={ref} {...rest} type={type} header={type}>
      <Paragraph width={320} rows={3} />
    </Notification>
  );
});

const instance = (
  <div>
    <ButtonToolbar>
      <Button onClick={() => toaster.push(<Message type="info" />, { placement: 'topStart' })}>
        Top Start
      </Button>
      <Button onClick={() => toaster.push(<Message type="info" />, { placement: 'topCenter' })}>
        Top Center
      </Button>
      <Button onClick={() => toaster.push(<Message type="info" />, { placement: 'topEnd' })}>
        Top End
      </Button>
      <Button onClick={() => toaster.push(<Message type="info" />, { placement: 'bottomStart' })}>
        Bottom Start
      </Button>
      <Button onClick={() => toaster.push(<Message type="info" />, { placement: 'bottomCenter' })}>
        Bottom Center
      </Button>
      <Button onClick={() => toaster.push(<Message type="info" />, { placement: 'bottomEnd' })}>
        Bottom End
      </Button>
    </ButtonToolbar>
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
