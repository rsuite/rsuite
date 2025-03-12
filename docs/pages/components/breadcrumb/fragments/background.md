<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';
import { GoHomeFill } from 'react-icons/go';

const App = () => (
  <div
    style={{
      background: 'var(--rs-placeholder)',
      padding: '12px 20px'
    }}
  >
    <Breadcrumb>
      <Breadcrumb.Item icon={<GoHomeFill />}>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Components</Breadcrumb.Item>
      <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
    </Breadcrumb>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
