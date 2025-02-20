<!--start-code-->

```js
import { Radio, RadioGroup } from 'rsuite';

const App = () => (
  <>
    <RadioGroup name="radio-group-inline-picker" inline appearance="picker" defaultValue="A">
      <Radio value="A">Radio A</Radio>
      <Radio value="B">Radio B</Radio>
      <Radio value="C">Radio C</Radio>
      <Radio value="D">Radio D</Radio>
    </RadioGroup>

    <hr />
    <RadioGroup name="radio-group-inline-picker-label" inline appearance="picker" defaultValue="A">
      <label>Label: </label>
      <Radio value="A">Radio A</Radio>
      <Radio value="B">Radio B</Radio>
      <Radio value="C">Radio C</Radio>
    </RadioGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
