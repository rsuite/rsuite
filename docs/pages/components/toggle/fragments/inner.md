<!--start-code-->

```js
import { Toggle, VStack, HStack } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

const App = () => (
  <VStack spacing={20}>
    <HStack>
      <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
      <Toggle
        size="lg"
        checkedChildren={<CheckIcon />}
        unCheckedChildren={<CloseIcon />}
        defaultChecked
      />
    </HStack>

    <HStack>
      <Toggle checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
      <Toggle checkedChildren={<CheckIcon />} unCheckedChildren={<CloseIcon />} defaultChecked />
    </HStack>

    <HStack>
      <Toggle size="sm" checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
      <Toggle
        size="sm"
        checkedChildren={<CheckIcon />}
        unCheckedChildren={<CloseIcon />}
        defaultChecked
      />
    </HStack>
  </VStack>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
