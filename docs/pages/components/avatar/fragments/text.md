<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <>
    <AvatarGroup spacing={6}>
      <Avatar style={{ background: '#000' }}>R</Avatar>
      <Avatar style={{ background: '#7B1FA2' }}>X</Avatar>
      <Avatar style={{ background: '#004299' }}>👍</Avatar>
    </AvatarGroup>

    <hr />
    <AvatarGroup spacing={6}>
      <Avatar circle style={{ background: '#000' }}>
        R
      </Avatar>
      <Avatar circle style={{ background: '#7B1FA2' }}>
        X
      </Avatar>
      <Avatar circle style={{ background: '#004299' }}>
        👍
      </Avatar>
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
