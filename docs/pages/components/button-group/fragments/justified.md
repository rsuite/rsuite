<!--start-code-->

```js
import { Button, ButtonGroup, VStack } from 'rsuite';

const ButtonGroupWithAppearance = ({ appearance }) => (
  <ButtonGroup justified>
    <Button appearance={appearance}>Chat</Button>
    <Button appearance={appearance}>Contact</Button>
    <Button appearance={appearance}>Discover</Button>
    <Button appearance={appearance}>Setting</Button>
  </ButtonGroup>
);

const App = () => (
  <VStack spacing={12}>
    <ButtonGroupWithAppearance />
    <ButtonGroupWithAppearance appearance="primary" />
    <ButtonGroupWithAppearance appearance="link" />
    <ButtonGroupWithAppearance appearance="subtle" />
    <ButtonGroupWithAppearance appearance="ghost" />
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
