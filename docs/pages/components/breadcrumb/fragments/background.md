<!--start-code-->

```js
import { Breadcrumb, Box } from 'rsuite';
import { GoHomeFill } from 'react-icons/go';

const App = () => (
  <Box bg="var(--rs-placeholder)" p="12px 20px">
    <Breadcrumb>
      <Breadcrumb.Item icon={<GoHomeFill />}>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Components</Breadcrumb.Item>
      <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  </Box>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
