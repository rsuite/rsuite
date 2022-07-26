<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';
const users = [
  { avatar: 'https://avatars.githubusercontent.com/u/12592949', name: 'superman66' },
  { avatar: 'https://avatars.githubusercontent.com/u/8225666', name: 'SevenOutman' },
  { avatar: 'https://avatars.githubusercontent.com/u/15609339', name: 'hiyangguo' },
  { avatar: 'https://avatars.githubusercontent.com/u/14308293', name: 'MarvelSQ' },
  { avatar: 'https://avatars.githubusercontent.com/u/1203827', name: 'simonguo' },
  { avatar: 'https://avatars.githubusercontent.com/u/9625224', name: 'theJian' },
  { avatar: 'https://avatars.githubusercontent.com/u/15884443', name: 'LeightonYao' },
  { avatar: 'https://avatars.githubusercontent.com/u/10924138', name: 'zmhawk' },
  { avatar: 'https://avatars.githubusercontent.com/u/2797600', name: 'posebear1990' },
  { avatar: 'https://avatars.githubusercontent.com/u/23637144', name: 'Sleaf' }
];

const max = 4;

const App = () => (
  <>
    <AvatarGroup stack>
      {users.map(user => (
        <Avatar circle key={user.name} src={user.avatar} alt={user.name} />
      ))}
    </AvatarGroup>

    <hr />

    <AvatarGroup stack>
      {users
        .filter((user, i) => i < max)
        .map(user => (
          <Avatar circle key={user.name} src={user.avatar} alt={user.name} />
        ))}
      <Avatar circle style={{ background: '#111' }}>
        +{users.length - max}
      </Avatar>
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
