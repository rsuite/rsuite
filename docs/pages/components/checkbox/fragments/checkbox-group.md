<!--start-code-->

```js
import { Checkbox, CheckboxGroup } from 'rsuite';

const App = () => (
  <CheckboxGroup name="checkbox-group">
    <Checkbox value="A">Checkbox A</Checkbox>
    <Checkbox value="B">Checkbox B</Checkbox>
    <Checkbox value="C">Checkbox C</Checkbox>
    <Checkbox value="D">Checkbox D</Checkbox>
  </CheckboxGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
