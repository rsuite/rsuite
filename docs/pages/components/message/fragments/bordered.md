<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <>
    <Message type="info" bordered showIcon>
      <strong>Info!</strong> You can use the `Message` component to display a info message.
    </Message>
    <Message type="success" bordered showIcon>
      <strong>Success!</strong> You can use the `Message` component to display a success message.
    </Message>
    <Message type="warning" bordered showIcon>
      <strong>Warning!</strong> You can use the `Message` component to display a warning message.
    </Message>
    <Message type="error" bordered showIcon>
      <strong>Error!</strong> You can use the `Message` component to display a error message.
    </Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
