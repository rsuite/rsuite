<!--start-code-->

```js
import { AvatarGroup, Badge, Avatar } from 'rsuite';

const App = () => (
  <AvatarGroup>
    <Badge>
      <Avatar src="https://avatars.githubusercontent.com/u/12592949" alt="@superman66" />
    </Badge>

    <Badge content="20">
      <Avatar src="https://avatars.githubusercontent.com/u/8225666" alt="@SevenOutman" />
    </Badge>
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
