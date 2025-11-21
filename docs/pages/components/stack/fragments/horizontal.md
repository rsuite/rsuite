<!--start-code-->

```js
import { HStack, Center } from 'rsuite';

const DecorativeBox = ({ children, ...rest }) => (
  <Center bg="var(--rs-placeholder)" p={40} rounded="lg" {...rest}>
    {children}
  </Center>
);

const App = () => {
  return (
    <HStack>
      <DecorativeBox />
      <DecorativeBox />
      <DecorativeBox />
    </HStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
