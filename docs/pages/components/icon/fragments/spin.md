<!--start-code-->

```js
import { HStack } from 'rsuite';
import GearIcon from '@rsuite/icons/Gear';
import SpinnerIcon from '@rsuite/icons/Spinner';

const App = () => (
  <HStack spacing={10}>
    <GearIcon spin style={{ fontSize: '2em' }} />
    <SpinnerIcon pulse style={{ fontSize: '2em' }} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
