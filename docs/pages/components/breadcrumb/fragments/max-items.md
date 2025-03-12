<!--start-code-->

```js
import { Breadcrumb } from 'rsuite';

const App = () => (
  <Breadcrumb
    maxItems={5}
    onExpand={() => {
      console.log('call onExpand');
    }}
  >
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>Library</Breadcrumb.Item>
    <Breadcrumb.Item>Data</Breadcrumb.Item>
    <Breadcrumb.Item>Computer Science</Breadcrumb.Item>
    <Breadcrumb.Item>Programming Languages</Breadcrumb.Item>
    <Breadcrumb.Item>JavaScript</Breadcrumb.Item>
  </Breadcrumb>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
