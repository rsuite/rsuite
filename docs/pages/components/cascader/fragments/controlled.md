<!--start-code-->

```js
import { Cascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => {
  const [value, setValue] = React.useState('1-2-2');

  return <Cascader value={value} onChange={setValue} data={data} style={{ width: 224 }} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
