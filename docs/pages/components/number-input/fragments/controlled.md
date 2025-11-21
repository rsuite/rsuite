<!--start-code-->

```js
import { NumberInput, VStack } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState(0.01);

  return (
    <VStack w={200}>
      <NumberInput value={value} onChange={setValue} step={0.01} />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
