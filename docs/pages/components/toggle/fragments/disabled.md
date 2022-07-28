<!--start-code-->

```js
import { Toggle } from 'rsuite';

const App = () => (
  <>
    <label>Disabled: </label>
    <Toggle disabled />
    <Toggle disabled checkedChildren="Enable" unCheckedChildren="Disabled" />
    <Toggle disabled defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    <hr />
    <label>Read only: </label>
    <Toggle readOnly />
    <Toggle readOnly checkedChildren="Enable" unCheckedChildren="Disabled" />
    <Toggle readOnly defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
    <hr />
    <label>Plaintext: </label>
    <Toggle plaintext />
    <Toggle plaintext checkedChildren="Enable" unCheckedChildren="Disabled" />
    <Toggle plaintext defaultChecked checkedChildren="Enable" unCheckedChildren="Disabled" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
