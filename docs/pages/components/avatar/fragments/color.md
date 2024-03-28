<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <>
    <AvatarGroup spacing={14}>
      <Avatar color="red" bordered circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar color="orange" bordered circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar color="yellow" bordered circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar color="green" bordered circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar color="cyan" bordered circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar color="blue" bordered circle src="https://i.pravatar.cc/150?u=1" />
      <Avatar color="violet" bordered circle src="https://i.pravatar.cc/150?u=1" />
    </AvatarGroup>

    <hr />

    <AvatarGroup spacing={6}>
      <Avatar color="red" circle />
      <Avatar color="orange" circle />
      <Avatar color="yellow" circle />
      <Avatar olor="green" circle />
      <Avatar color="cyan" circle />
      <Avatar color="blue" circle />
      <Avatar color="violet" circle />
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
