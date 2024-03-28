<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <AvatarGroup spacing={20}>
    <Avatar bordered src="https://i.pravatar.cc/150?u=1" />
    <Avatar bordered circle src="https://i.pravatar.cc/150?u=2" />
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
