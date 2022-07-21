<!--start-code-->

```js
import { Checkbox, CheckboxGroup } from 'rsuite';

const App = () => (
  <CheckboxGroup inline name="checkboxList">
    <Checkbox value="A">Item A</Checkbox>
    <Checkbox value="B">Item B</Checkbox>
    <Checkbox value="C">Item C</Checkbox>
    <Checkbox value="D" disabled>
      Item D
    </Checkbox>
  </CheckboxGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
