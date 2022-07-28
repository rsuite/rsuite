```js
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';
```

<!--start-code-->

```js
import { Icon } from '@rsuite/icons';
import { FaCamera, FaReact, FaAddressBook, FaSpinner } from 'react-icons/fa';

const App = () => (
  <div className="icon-example-list">
    <Icon as={FaSpinner} pulse size="2em" />
    <Icon as={FaCamera} size="2em" />
    <Icon as={FaReact} size="2em" style={{ color: '#61dafb' }} />
    <Icon as={FaAddressBook} size="2em" />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
