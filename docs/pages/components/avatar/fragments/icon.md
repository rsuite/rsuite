<!--start-code-->

```js
import { AvatarGroup, Badge, Avatar } from 'rsuite';
import { FaUserLarge } from 'react-icons/fa6';
import { FcBusinessman, FcCustomerSupport } from 'react-icons/fc';

const App = () => (
  <AvatarGroup spacing={6}>
    <Avatar>
      <FaUserLarge />
    </Avatar>
    <Avatar>
      <FaUserLarge size={30} />
    </Avatar>

    <Avatar>
      <FcBusinessman size={30} />
    </Avatar>

    <Avatar>
      <FcCustomerSupport size={30} />
    </Avatar>
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
