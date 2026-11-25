<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <AvatarGroup spacing={6}>
    <Avatar src="https://i.pravatar.cc/150?u=1" />
    <Avatar circle />
    <Avatar src="https://i.pravatar.cc/150?u=2" circle />
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
