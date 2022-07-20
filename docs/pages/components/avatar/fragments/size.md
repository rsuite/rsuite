<!--start-code-->

```js
import { AvatarGroup, Avatar } from 'rsuite';

const App = () => (
  <>
    <AvatarGroup spacing={6}>
      <Avatar
        size="lg"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
      <Avatar
        size="md"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
      <Avatar
        size="sm"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
      <Avatar
        size="xs"
        circle
        src="https://avatars.githubusercontent.com/u/12592949"
        alt="@SevenOutman"
      />
    </AvatarGroup>

    <hr />

    <AvatarGroup size="xs">
      <Avatar circle src="https://avatars.githubusercontent.com/u/12592949" alt="@superman66" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/8225666" alt="@SevenOutman" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/15609339" alt="@hiyangguo" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/14308293" alt="@MarvelSQ" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/1203827" alt="@simonguo" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/9625224" alt="@theJian" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/15884443" alt="@LeightonYao" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/10924138" alt="@zmhawk" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/2797600" alt="@posebear1990" />
      <Avatar circle src="https://avatars.githubusercontent.com/u/23637144" alt="@Sleaf" />
    </AvatarGroup>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
