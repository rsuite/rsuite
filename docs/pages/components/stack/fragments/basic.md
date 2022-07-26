<!--start-code-->

```js
import { Stack, Input, Button } from 'rsuite';

const App = () => {
  return (
    <Stack spacing={6}>
      Label:
      <Input />
      <Button appearance="primary">Submit</Button>
      <Button>Reset</Button>
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
