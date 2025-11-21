<!--start-code-->

```js
import { Toggle, VStack } from 'rsuite';

const App = () => {
  return (
    <VStack spacing={20}>
      <Toggle label="Label on the right" labelPlacement="end" />
      <Toggle label="Label on the left" labelPlacement="start" />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
