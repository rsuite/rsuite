<!--start-code-->

```js
import { InputNumber, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(0.01);

  return (
    <Stack>
      <InputNumber value={value} onChange={setValue} step={0.01} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
