```js
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';
```

<!--start-code-->

```js
import { HStack } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';

const App = () => (
  <HStack spacing={10}>
    <Icon as={FaSpinner} pulse size="2em" />
    <Icon as={FaCamera} size="2em" />
    <Icon as={FaReact} size="2em" style={{ color: '#61dafb' }} />
    <Icon as={FaAddressBook} size="2em" />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
