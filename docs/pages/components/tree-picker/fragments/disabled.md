<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [2, 3, 3], labels: ['Provincial', 'County', 'Town'] });

const App = () => (
  <div>
    <label>Disabled: </label>
    <TreePicker disabled data={data} defaultValue={'1-1'} style={{ width: 246 }} />
    <hr />
    <label>Disabled option: </label>
    <TreePicker
      defaultExpandAll
      data={data}
      defaultValue={'1-1'}
      disabledItemValues={['1-1-1', '2']}
      style={{ width: 246 }}
    />

    <hr />
    <label>Read only: </label>
    <TreePicker readOnly data={data} defaultValue={'1-1'} style={{ width: 246 }} />

    <hr />
    <label>Plaintext: </label>
    <TreePicker plaintext data={data} defaultValue={'1-1'} style={{ width: 246 }} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
