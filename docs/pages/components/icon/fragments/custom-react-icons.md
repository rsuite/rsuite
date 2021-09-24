```js
import {
  FaCamera as FaCameraIcon,
  FaReact as FaReactIcon,
  FaAddressBook as FaAddressBookIcon,
  FaSpinner as FaSpinnerIcon
} from 'react-icons/fa';
```

<!--start-code-->

```js
/** 
import { Icon } from '@rsuite/icons';
import {
  FaCamera as FaCameraIcon,
  FaReact as FaReactIcon,
  FaAddressBook as FaAddressBookIcon,
  FaSpinner as FaSpinnerIcon
} from 'react-icons/fa';
*/

const instance = (
  <div className="icon-example-list">
    <Icon as={FaSpinnerIcon} pulse size="2em" />
    <Icon as={FaCameraIcon} size="2em" />
    <Icon as={FaReactIcon} size="2em" style={{ color: '#61dafb' }} />
    <Icon as={FaAddressBookIcon} size="2em" />
  </div>
);

ReactDOM.render(instance);
```

<!--end-code-->
