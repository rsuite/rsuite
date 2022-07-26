<!--start-code-->

```js
import { Radio } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState('A');
  return (
    <RadioGroup inline name="radio-name" value={value} onChange={setValue}>
      <Radio value="A">Item A</Radio>
      <Radio value="B">Item B</Radio>
      <Radio value="C">Item C</Radio>
      <Radio value="D" disabled>
        Item D
      </Radio>
    </RadioGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
