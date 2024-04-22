<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';

const App = () => (
  <Breadcrumb>
    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="/components/overview">Components</Breadcrumb.Item>
    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
  </Breadcrumb>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
