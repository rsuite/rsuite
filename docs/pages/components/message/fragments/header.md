<!--start-code-->

```js
import { Message, Button, Divider } from 'rsuite';

const App = () => (
  <>
    <Message showIcon type="warning" header={<strong>Cannot delete the file</strong>}>
      We are sorry, the file cannot be deleted. Please try again later.
    </Message>

    <Message showIcon type="error" header={<strong>A problem occurred</strong>}>
      <ol>
        <li>Please check your network connection.</li>
        <li>Please check the file permissions.</li>
        <li>Please check the file size.</li>
        <li>Please check the file format.</li>
      </ol>
    </Message>

    <Message showIcon type="info" header={<strong>Do you want to allow notifications?</strong>}>
      We can let you know when new messages arrive.
      <hr />
      <ButtonToolbar>
        <Button size="sm">Don't allow</Button>
        <Button size="sm">Allow</Button>
      </ButtonToolbar>
    </Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
