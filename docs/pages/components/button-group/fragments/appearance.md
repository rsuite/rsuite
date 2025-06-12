<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup, VStack, HStack, Text } from 'rsuite';

const ButtonGroupWithAppearance = ({ appearance }) => (
  <HStack>
    <Text w={80} muted>
      {appearance}
    </Text>
    <ButtonGroup>
      <Button appearance={appearance}>Bold</Button>
      <Button appearance={appearance}>Italic</Button>
      <Button appearance={appearance}>Underline</Button>
    </ButtonGroup>
  </HStack>
);

const App = () => (
  <VStack>
    <ButtonGroupWithAppearance appearance="default" />
    <ButtonGroupWithAppearance appearance="primary" />
    <ButtonGroupWithAppearance appearance="link" />
    <ButtonGroupWithAppearance appearance="subtle" />
    <ButtonGroupWithAppearance appearance="ghost" />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
