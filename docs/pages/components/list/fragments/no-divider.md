<!--start-code-->

```js
import { List, HStack, Text } from 'rsuite';
import PeoplesIcon from '@rsuite/icons/Peoples';
import LocationIcon from '@rsuite/icons/Location';
import EmailIcon from '@rsuite/icons/Email';
import GlobalIcon from '@rsuite/icons/Global';

const data = [
  {
    id: 1,
    icon: <PeoplesIcon />,
    value: 'rsuite/team'
  },
  {
    id: 2,
    icon: <LocationIcon />,
    value: 'Shanghai, China'
  },
  {
    id: 3,
    icon: <EmailIcon />,
    value: <a href="mailto:john.doe@rsuitejs.com">john.doe@rsuitejs.com</a>
  },
  {
    id: 4,
    icon: <GlobalIcon />,
    value: <a href="http://rsuitejs.com">rsuitejs.com</a>
  }
];

const App = () => (
  <List divider={false} size="xs">
    {data.map(item => (
      <List.Item key={item.id}>
        <HStack>
          {item.icon}
          <Text>{item.value}</Text>
        </HStack>
      </List.Item>
    ))}
  </List>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
