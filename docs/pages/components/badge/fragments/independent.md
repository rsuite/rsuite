<!--start-code-->

```js
import { Badge, HStack } from 'rsuite';
import { MdCheck, MdNotifications } from 'react-icons/md';
import { BsExclamation } from 'react-icons/bs';

const App = () => (
  <>
    <HStack>
      <Badge />
      <Badge style={{ background: '#4caf50' }} />

      <Badge compact color="green" content={<MdCheck size={16} />} />
      <Badge compact content={<MdNotifications size={16} />} />
      <Badge content="6" />
      <Badge content="99+" />
      <Badge content="new" color="yellow" />
    </HStack>
    <hr />
    <HStack>
      <Badge compact color="green" content={<MdCheck size={16} />} />
      <Text>Ready</Text>
    </HStack>
    <hr />
    <HStack>
      <Badge compact color="red" content={<BsExclamation size={16} />} />
      <Text>Error</Text>
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
