<!--start-code-->

```js
import { MultiCascader } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const ControlLabel = ({ children }) => (
  <label style={{ width: 120, display: 'inline-block', color: 'var(--rs-text-secondary)' }}>
    {children}:
  </label>
);

const App = () => (
  <>
    <ControlLabel>Disabled</ControlLabel>
    <MultiCascader disabled defaultValue={['1-1']} data={data} style={{ width: 224 }} />
    <hr />
    <ControlLabel>Disabled options</ControlLabel>
    <MultiCascader data={data} disabledItemValues={['1', '2-1']} style={{ width: 224 }} />
    <hr />
    <ControlLabel>Read only</ControlLabel>
    <MultiCascader readOnly defaultValue={['1-1']} data={data} style={{ width: 224 }} />

    <hr />
    <ControlLabel>Plaintext</ControlLabel>
    <MultiCascader plaintext defaultValue={['1-1']} data={data} style={{ width: 224 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
