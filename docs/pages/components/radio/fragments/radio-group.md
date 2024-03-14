<!--start-code-->

```js
import { Radio, RadioGroup } from 'rsuite';

const App = () => (
  <RadioGroup name="radio-group">
    <Radio value="A">Item A</Radio>
    <Radio value="B">Item B</Radio>
    <Radio value="C">Item C</Radio>
    <Radio value="D" disabled>
      Item D
    </Radio>
  </RadioGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
