<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <>
    <AvatarGroup spacing={6}>
      <Avatar size="xxl" circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar size="xl" circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar size="lg" circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar size="md" circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar size="sm" circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar size="xs" circle src="https://i.pravatar.cc/150?u=1" />
    </AvatarGroup>

    <hr />

    <AvatarGroup spacing={6}>
      <Avatar size="xxl" circle />
      <Avatar size="xl" circle />
      <Avatar size="lg" circle />
      <Avatar size="md" circle />
      <Avatar size="sm" circle />
      <Avatar size="xs" circle />
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
