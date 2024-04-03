<!--start-code-->

```js
import { AvatarGroup, Badge, Avatar } from 'rsuite';

const App = () => (
  <AvatarGroup>
    <Badge>
      <Avatar src="https://i.pravatar.cc/150?u=1" />
    </Badge>

    <Badge content="20">
      <Avatar src="https://i.pravatar.cc/150?u=2" />
    </Badge>
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
