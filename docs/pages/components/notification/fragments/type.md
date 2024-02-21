<!--start-code-->

```js
import { Notification } from 'rsuite';

const App = () => (
  <Stack spacing={10} direction="column" alignItems="flex-start">
    <Notification type="info" header="New message">
      You have a new message, please check it.
    </Notification>
    <Notification type="success" header="Operation successful">
      The email has been sent successfully, please check it in the mailbox.
    </Notification>
    <Notification type="warning" header="Capacity warning">
      Your mailbox capacity has exceeded 90%, please clean it up in time to avoid affecting normal
      use.
    </Notification>
    <Notification type="error" header="Operation failed">
      The email failed to send, please try again later.
    </Notification>
  </Stack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
