<!--start-code-->

```js
import { Center, Box } from 'rsuite';
import { MdEmail } from 'react-icons/md';

const App = () => (
  <Center inline>
    <MdEmail size={20} />
    <Box ml={4}>Send email</Box>
  </Center>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
