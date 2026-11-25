<!--start-code-->

```js
import { Message } from 'rsuite';

const App = () => (
  <Message type="success" centered showIcon header="Application has been accepted !">
    <p>
      Your application has been successfully submitted, and we will process it within 1-3 working
      days.
    </p>
    <p>
      You can check the application status in the <a href="#">application record</a>.
    </p>
  </Message>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
