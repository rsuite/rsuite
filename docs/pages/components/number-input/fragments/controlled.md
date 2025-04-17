<!--start-code-->

```js
import { NumberInput, Stack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(0.01);

  return (
    <Stack w={200}>
      <NumberInput value={value} onChange={setValue} step={0.01} />
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
