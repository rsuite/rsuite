```js
import * as faCamera from '@fortawesome/free-solid-svg-icons/faCamera';
import * as faReact from '@fortawesome/free-brands-svg-icons/faReact';
import * as faAddressBook from '@fortawesome/free-regular-svg-icons/faAddressBook';
```

<!--start-code-->

```js
import { HStack } from 'rsuite';
import { Icon } from '@rsuite/icons';
import * as faCamera from '@fortawesome/free-solid-svg-icons/faCamera';
import * as faReact from '@fortawesome/free-brands-svg-icons/faReact';
import * as faAddressBook from '@fortawesome/free-regular-svg-icons/faAddressBook';

const FaSvgIcon = ({ faIcon, ...rest }) => {
  const { width, height, svgPathData } = faIcon;
  return (
    <svg {...rest} viewBox={`0 0 ${width} ${height}`} width="2em" height="2em" fill="currentColor">
      <path d={svgPathData}></path>
    </svg>
  );
};

const App = () => (
  <HStack spacing={10}>
    <Icon as={FaSvgIcon} faIcon={faCamera} />
    <Icon as={FaSvgIcon} faIcon={faReact} style={{ color: '#61dafb' }} />
    <Icon as={FaSvgIcon} faIcon={faAddressBook} />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
