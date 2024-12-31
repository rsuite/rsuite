<!--start-code-->

```js
import { Avatar, Badge, HStack, IconButton } from 'rsuite';
import { MdNotifications } from 'react-icons/md';

const App = () => (
  <>
    <HStack spacing={10}>
      <Badge content={6} shape="rectangle">
        <Avatar src="https://i.pravatar.cc/150?u=1" />
      </Badge>

      <Badge content={6} shape="circle">
        <Avatar src="https://i.pravatar.cc/150?u=2" circle />
      </Badge>
    </HStack>
    <hr />
    <HStack spacing={10}>
      <Badge content={6} shape="rectangle">
        <IconButton icon={<MdNotifications size={20} />} size="sm" />
      </Badge>

      <Badge content={6} shape="circle">
        <IconButton icon={<MdNotifications size={20} />} circle size="sm" />
      </Badge>
    </HStack>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
