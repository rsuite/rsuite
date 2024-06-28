<!--start-code-->

```js
import { Stack, Button } from 'rsuite';

const items = Array.from({ length: 23 }, (_, index) => index + 1);

const App = () => {
  return (
    <Stack wrap spacing={6}>
      {items.map(item => (
        <Button key={item}>Item {item}</Button>
      ))}
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
