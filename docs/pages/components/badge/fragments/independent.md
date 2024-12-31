<!--start-code-->

```js
import { Badge, HStack } from 'rsuite';
import { MdCheck, MdNotifications, MdError } from 'react-icons/md';

const App = () => (
  <>
    <HStack>
      <Badge />
      <Badge style={{ background: '#4caf50' }} />
      <Badge compact color="green" content={<MdCheck size={12} />} />
      <Badge compact content={<MdNotifications />} />

      <Badge content="99+" />
      <Badge content="new" color="yellow" />
    </HStack>
    <hr />
    <HStack>
      <Badge compact color="green" content={<MdCheck size={12} />} />
      <Text>Ready</Text>
    </HStack>
    <hr />
    <HStack>
      <Badge compact color="red" content={<MdError size={12} />} />
      <Text>Error</Text>
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
