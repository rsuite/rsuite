<!--start-code-->

```js
import { Notification } from 'rsuite';

const App = () => (
  <>
    <Notification type="error" header="Operation failed" closable>
      The email failed to send, please try again later.
    </Notification>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
