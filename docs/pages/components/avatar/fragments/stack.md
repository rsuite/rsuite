<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';
const users = [
  { avatar: 'https://i.pravatar.cc/150?u=1', name: 'John Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=2', name: 'Tom Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=3', name: 'Jerry Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=4', name: 'Lily Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=5', name: 'Lucy Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=6', name: 'Mike Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=7', name: 'Jane Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=8', name: 'Kate Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=9', name: 'Jack Doe' },
  { avatar: 'https://i.pravatar.cc/150?u=10', name: 'Rose Doe' }
];

const max = 4;

const App = () => (
  <>
    <AvatarGroup stack>
      {users.map(user => (
        <Avatar bordered circle key={user.name} src={user.avatar} alt={user.name} />
      ))}
    </AvatarGroup>

    <hr />

    <AvatarGroup stack>
      {users
        .filter((user, i) => i < max)
        .map(user => (
          <Avatar bordered circle key={user.name} src={user.avatar} alt={user.name} />
        ))}
      <Avatar bordered circle style={{ background: '#111' }}>
        +{users.length - max}
      </Avatar>
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
