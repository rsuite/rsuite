<!--start-code-->

```js
import { Steps } from 'rsuite';

const App = () => (
  <Steps current={1}>
    <Steps.Item title="Finished" description="This is a description." />
    <Steps.Item title="In Progress" description="This is a description." />
    <Steps.Item title="Waiting" description="This is a description." />
    <Steps.Item title="Waiting" description="This is a description." />
  </Steps>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
