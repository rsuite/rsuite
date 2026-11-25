<!--start-code-->

```js
import { Radio } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState('A');
  return (
    <RadioGroup name="radio-group-controlled" value={value} onChange={setValue}>
      <Radio value="A">Radio A</Radio>
      <Radio value="B">Radio B</Radio>
      <Radio value="C">Radio C</Radio>
      <Radio value="D">Radio D</Radio>
    </RadioGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
