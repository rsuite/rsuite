<!--start-code-->

```js
import { Button, ButtonGroup, VStack, HStack } from 'rsuite';

const ButtonGroupWithAppearance = ({ appearance, vertical }) => (
  <ButtonGroup divided vertical={vertical}>
    <Button appearance={appearance}>Bold</Button>
    <Button appearance={appearance}>Italic</Button>
    <Button appearance={appearance}>Underline</Button>
  </ButtonGroup>
);

const App = () => (
  <VStack spacing={12}>
    <HStack>
      <ButtonGroupWithAppearance appearance="default" />
      <ButtonGroupWithAppearance appearance="primary" />
    </HStack>

    <HStack>
      <ButtonGroupWithAppearance appearance="default" vertical />
      <ButtonGroupWithAppearance appearance="primary" vertical />
    </HStack>
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
