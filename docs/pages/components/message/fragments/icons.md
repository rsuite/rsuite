<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <>
    <Message showIcon type="info">
      <strong>Info!</strong> You can use the `Message` component to display a info message.
    </Message>
    <Message showIcon type="success">
      <strong>Success!</strong> You can use the `Message` component to display a success message.
    </Message>
    <Message showIcon type="warning">
      <strong>Warning!</strong> You can use the `Message` component to display a warning message.
    </Message>
    <Message showIcon type="error">
      <strong>Error!</strong> You can use the `Message` component to display a error message.
    </Message>
    <hr />
    <Message showIcon type="info" header="Info">
      Additional description and informations about copywriting.
    </Message>

    <Message showIcon type="success" header="Success">
      Detailed description and advices about successful copywriting.
    </Message>

    <Message showIcon type="warning" header="Warning">
      This is a warning notice about copywriting.
    </Message>

    <Message showIcon type="error" header="Error">
      This is an error message about copywriting.
    </Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
