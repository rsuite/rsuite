<!--start-code-->

```js
import { AvatarGroup, Badge, Avatar } from 'rsuite';
import { Icon } from '@rsuite/icons';
import UserIcon from '@rsuite/icons/legacy/User';

const App = () => (
  <AvatarGroup spacing={6}>
    <Avatar>
      <UserIcon />
    </Avatar>
    <Avatar>🙂</Avatar>
    <Avatar>👍</Avatar>
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
