<!--start-code-->

```js
import { Avatar } from 'rsuite';
import Image from 'next/image';

const App = () => (
  <Avatar circle size="lg">
    <Image
      src="https://i.pravatar.cc/150?u=1"
      alt="Avatar"
      width={60}
      height={60}
      unoptimized
    />
  </Avatar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
