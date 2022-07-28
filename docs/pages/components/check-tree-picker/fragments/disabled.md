<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
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
  <>
    <ControlLabel>Disabled: </ControlLabel>
    <CheckTreePicker disabled data={data} defaultValue={[24]} style={{ width: 220 }} />
    <hr />
    <ControlLabel>Disabled option: </ControlLabel>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      disabledItemValues={['1-1', '1-1-2']}
      defaultValue={[24]}
      style={{ width: 220 }}
    />
    <hr />
    <ControlLabel>Uncheckable: </ControlLabel>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      uncheckableItemValues={['1-1', '1-1-2']}
      defaultValue={[24]}
      style={{ width: 220 }}
    />

    <hr />
    <ControlLabel>Read only: </ControlLabel>
    <CheckTreePicker readOnly data={data} defaultValue={[24]} style={{ width: 220 }} />
    <hr />
    <ControlLabel>Plaintext: </ControlLabel>
    <CheckTreePicker plaintext data={data} defaultValue={[24]} style={{ width: 220 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
