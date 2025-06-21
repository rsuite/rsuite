<!--start-code-->

```js
import { HStack, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={20} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  return (
    <HStack align="start" spacing={20}>
      <DecorativeBox w={80} h={80} />
      <DecorativeBox w={80} h={80} />
      <DecorativeBox w={80} h={80} />
      <Stack.Item grow={1}>
        <DecorativeBox h={80} />
      </Stack.Item>
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
