<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <>
    <AvatarGroup spacing={6}>
      <Avatar color="green">R</Avatar>
      <Avatar bg="linear-gradient(45deg, #4CAF50, #2196F3)">X</Avatar>
      <Avatar color="blue">👍</Avatar>
    </AvatarGroup>

    <hr />
    <AvatarGroup spacing={6}>
      <Avatar circle color="green">
        R
      </Avatar>
      <Avatar circle bg="linear-gradient(45deg, #4CAF50, #2196F3)">
        X
      </Avatar>
      <Avatar circle color="blue">
        👍
      </Avatar>
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
