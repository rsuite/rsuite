<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <>
    <Message type="info">Informational</Message>
    <Message type="success">Success</Message>
    <Message type="warning">Warning</Message>
    <Message type="error">Error</Message>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
