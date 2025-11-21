<!--start-code-->

```js
import { Stack, Center } from 'rsuite';

const items = Array.from({ length: 23 }, (_, index) => index + 1);
const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  return (
    <Stack wrap spacing={6}>
      {items.map(item => (
        <DecorativeBox key={item} />
      ))}
    </Stack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
