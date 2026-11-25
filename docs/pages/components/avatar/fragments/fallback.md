<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <AvatarGroup spacing={6}>
    <Avatar circle src="https://images.unsplash.com/broken" alt="Alt" />
    <Avatar circle src="https://images.unsplash.com/broken" />
  </AvatarGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
