<!--start-code-->

```js
import { Notification, Placeholder } from 'rsuite';

const Message = React.forwardRef(({ type, ...rest }, ref) => {
  return (
    <Notification ref={ref} {...rest} type={type} header={type}>
      <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
    </Notification>
  );
});

const App = () => (
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
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
