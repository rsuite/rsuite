<!--start-code-->

```jsx
import { PinInput } from 'rsuite';

const App = () => (
  <PinInput
    length={6}
    allowedKeys={/^[A-Fa-f0-9]$/}
    placeholder="A"
  />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
