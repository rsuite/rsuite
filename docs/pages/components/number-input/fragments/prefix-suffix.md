<!--start-code-->

```js
import { NumberInput, VStack } from 'rsuite';

const App = () => {
  return (
    <VStack spacing={10} w={200}>
      <NumberInput prefix="$" />
      <NumberInput suffix="￥" />
      <NumberInput suffix="%" />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
