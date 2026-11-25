<!--start-code-->

```js
import { Steps } from 'rsuite';

const App = () => (
  <Steps current={1}>
    <Steps.Item />
    <Steps.Item />
    <Steps.Item />
    <Steps.Item />
  </Steps>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
