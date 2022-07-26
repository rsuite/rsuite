<!--start-code-->

```js
import { Radio, RadioGroup, Form } from 'rsuite';

const App = () => (
  <Form.Group controlId="radioList">
    <RadioGroup name="radioList">
      <p>Group1</p>
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <p>Group2</p>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>
        Item D
      </Radio>
    </RadioGroup>
  </Form.Group>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
