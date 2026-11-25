<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <>
    <Message type="info">
      <strong>Info!</strong> You can use the `Message` component to display a info message.
    </Message>
    <Message type="success">
      <strong>Success!</strong> You can use the `Message` component to display a success message.
    </Message>
    <Message type="warning">
      <strong>Warning!</strong> You can use the `Message` component to display a warning message.
    </Message>
    <Message type="error">
      <strong>Error!</strong> You can use the `Message` component to display a error message.
    </Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
