<!--start-code-->

```js
import { Button, ButtonGroup, VStack, HStack } from 'rsuite';

const CustomButtonGroup = ({ appearance, vertical }) => (
  <ButtonGroup divided vertical={vertical}>
    <Button appearance={appearance}>Left</Button>
    <Button appearance={appearance}>Center</Button>
    <Button appearance={appearance}>Right</Button>
  </ButtonGroup>
);

const App = () => (
  <>
    <VStack>
      <CustomButtonGroup appearance="default" />
      <CustomButtonGroup appearance="primary" />
    </VStack>
    <hr />
    <HStack>
      <CustomButtonGroup appearance="default" vertical />
      <CustomButtonGroup appearance="primary" vertical />
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
