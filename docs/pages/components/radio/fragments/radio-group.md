<!--start-code-->

```js
import { Radio, RadioGroup } from 'rsuite';

const App = () => (
  <RadioGroup name="radio-group" defaultValue="A">
    <Radio value="A">Radio A</Radio>
    <Radio value="B">Radio B</Radio>
    <Radio value="C">Radio C</Radio>
    <Radio value="D">Radio D</Radio>
  </RadioGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
