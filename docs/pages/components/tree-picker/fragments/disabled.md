<!--start-code-->

```js
import { TreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const ControlLabel = ({ children }) => (
  <label style={{ width: 130, display: 'inline-block' }}>{children}</label>
);

const App = () => (
  <div>
    <ControlLabel>Disabled: </ControlLabel>
    <TreePicker disabled data={data} defaultValue={'1-1'} style={{ width: 246 }} />
    <hr />
    <ControlLabel>Disabled option: </ControlLabel>
    <TreePicker
      defaultExpandAll
      data={data}
      defaultValue={'1-1'}
      disabledItemValues={['1-1-1', '2']}
      style={{ width: 246 }}
    />

    <hr />
    <ControlLabel>Read only: </ControlLabel>
    <TreePicker readOnly data={data} defaultValue={'1-1'} style={{ width: 246 }} />

    <hr />
    <ControlLabel>Plaintext: </ControlLabel>
    <TreePicker plaintext data={data} defaultValue={'1-1'} style={{ width: 246 }} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
