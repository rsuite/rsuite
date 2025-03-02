<!--start-code-->

```js
import { Divider } from 'rsuite';

const App = () => (
  <>
    <Divider color="red" label="Red" />
    <Divider color="orange" label="Orange" />
    <Divider color="yellow" label="Yellow" />
    <Divider color="green" label="Green" />
    <Divider color="cyan" label="Cyan" />
    <Divider color="blue" label="Blue" />
    <Divider color="violet" label="Violet" />
    <Divider color="#000" label="Custom Color" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
