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
    <HStack spacing={40} align="flex-start">
      <DecorativeBox w={80} h={80} />
      <DecorativeBox w={80} h={20} />
      <DecorativeBox w={80} h={20} />

      <Stack.Item alignSelf="flex-end">
        <DecorativeBox w={80} h={20} />
      </Stack.Item>

    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
