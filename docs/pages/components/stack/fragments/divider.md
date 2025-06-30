<!--start-code-->

```js
import { HStack, VStack, Center, Divider } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={40} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  return (
    <VStack divider={<Divider />}>
      <DecorativeBox />
      <HStack divider={<Divider vertical />} h={80}>
        <DecorativeBox />
        <DecorativeBox />
        <DecorativeBox />
      </HStack>
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
