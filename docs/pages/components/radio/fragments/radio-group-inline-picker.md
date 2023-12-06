<!--start-code-->

```js
import { Radio, RadioGroup, Form } from 'rsuite';

const RadioLabel = ({ children }) => <label style={{ padding: 7 }}>{children}</label>;

const App = () => (
  <Form.Group controlId="radioList">
    <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>
        Item D
      </Radio>
    </RadioGroup>

    <hr />
    <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
      <RadioLabel>Status: </RadioLabel>
      <Radio value="A">All</Radio>
      <Radio value="B">Enabled</Radio>
      <Radio value="C">Disabled</Radio>
    </RadioGroup>
  </Form.Group>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
