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
    <Message type="info" />
    <hr />
    <Message type="success" />
    <hr />
    <Message type="warning" />
    <hr />
    <Message type="error" />
  </div>
);
ReactDOM.render(instance);
```

<!--end-code-->
