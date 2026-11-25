<!--start-code-->

```js
import { Steps } from 'rsuite';

const App = () => (
  <Steps current={1} small>
    <Steps.Item title="Finished" />
    <Steps.Item title="In progress" />
    <Steps.Item title="Waiting" />
    <Steps.Item title="Waiting" />
  </Steps>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
