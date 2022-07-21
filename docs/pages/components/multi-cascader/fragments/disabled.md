<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <>
    <label>Disabled: </label>
    <MultiCascader disabled defaultValue={['1-1']} data={data} style={{ width: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <MultiCascader data={data} disabledItemValues={['1', '2-1']} style={{ width: 224 }} />
    <hr />
    <label>Read only: </label>
    <MultiCascader readOnly defaultValue={['1-1']} data={data} style={{ width: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <MultiCascader plaintext defaultValue={['1-1']} data={data} style={{ width: 224 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
