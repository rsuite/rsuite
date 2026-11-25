<!--start-code-->

```js
import { Badge, Avatar, HStack } from 'rsuite';
import { MdCheck, MdNotifications, MdError } from 'react-icons/md';
import { BsExclamation } from "react-icons/bs";

const App = () => (
  <HStack spacing={10}>
    <Badge content={6}>
      <Avatar src="https://i.pravatar.cc/150?u=1" />
    </Badge>

    <Badge content="new" color="yellow">
      <Avatar src="https://i.pravatar.cc/150?u=2" />
    </Badge>

    <Badge color="green" placement="bottomEnd">
      <Avatar src="https://i.pravatar.cc/150?u=3" />
    </Badge>

    <Badge compact color="green" placement="bottomEnd" content={<MdCheck size={12} />}>
      <Avatar src="https://i.pravatar.cc/150?u=4" />
    </Badge>

    <Badge compact content={<MdNotifications size={14} />}>
      <Avatar src="https://i.pravatar.cc/150?u=6" />
    </Badge>

    <Badge compact content={<BsExclamation size={14} />}>
      <Avatar />
    </Badge>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
