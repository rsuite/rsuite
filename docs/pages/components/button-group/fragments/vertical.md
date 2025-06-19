<!--start-code-->

```js
import { Button, ButtonGroup, VStack, HStack, Text } from 'rsuite';

const ButtonGroupWithAppearance = ({ appearance }) => (
  <VStack align="center" spacing={12}>
    <Text w={80} muted align="center">
      {appearance}
    </Text>
    <ButtonGroup vertical>
      <Button appearance={appearance}>Export</Button>
      <Button appearance={appearance}>Print</Button>
      <Button appearance={appearance}>Duplicate</Button>
    </ButtonGroup>
  </VStack>
);

const App = () => (
  <HStack>
    <ButtonGroupWithAppearance appearance="default" />
    <ButtonGroupWithAppearance appearance="primary" />
    <ButtonGroupWithAppearance appearance="link" />
    <ButtonGroupWithAppearance appearance="subtle" />
    <ButtonGroupWithAppearance appearance="ghost" />
  </HStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
