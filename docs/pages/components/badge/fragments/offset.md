<!--start-code-->

```js
import { Avatar, Badge, HStack, IconButton } from 'rsuite';
import { MdNotifications } from 'react-icons/md';

const App = () => (
  <Badge content={6} shape="circle" offset={[5, 5]}>
    <IconButton icon={<MdNotifications size={20} />} circle appearance="subtle" />
  </Badge>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
