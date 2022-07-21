<!--start-code-->

```js
import { Cascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <label>Disabled: </label>
    <Cascader disabled defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <Cascader
      data={data}
      defaultValue="1-1"
      disabledItemValues={['2', '1-1']}
      style={{ widht: 224 }}
    />
    <hr />
    <label>Read only: </label>
    <Cascader readOnly defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <Cascader plaintext defaultValue="1-1" data={data} style={{ widht: 224 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
