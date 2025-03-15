<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';
import { GoHomeFill } from 'react-icons/go';

const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item icon={<GoHomeFill />}>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Components</Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
