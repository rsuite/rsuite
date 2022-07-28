<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
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
    <MultiCascader disabled defaultValue={['1-1']} data={data} style={{ width: 224 }} />
    <hr />
    <ControlLabel>Disabled option: </ControlLabel>
    <MultiCascader data={data} disabledItemValues={['1', '2-1']} style={{ width: 224 }} />
    <hr />
    <ControlLabel>Read only: </ControlLabel>
    <MultiCascader readOnly defaultValue={['1-1']} data={data} style={{ width: 224 }} />

    <hr />
    <ControlLabel>Plaintext: </ControlLabel>
    <MultiCascader plaintext defaultValue={['1-1']} data={data} style={{ width: 224 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
