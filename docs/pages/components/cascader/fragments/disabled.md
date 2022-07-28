<!--start-code-->

```js
import { Cascader } from 'rsuite';
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
    <Cascader disabled defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <hr />
    <ControlLabel>Disabled option: </ControlLabel>
    <Cascader
      data={data}
      defaultValue="1-1"
      disabledItemValues={['2', '1-1']}
      style={{ widht: 224 }}
    />
    <hr />
    <ControlLabel>Read only: </ControlLabel>
    <Cascader readOnly defaultValue="1-1" data={data} style={{ widht: 224 }} />

    <hr />
    <ControlLabel>Plaintext: </ControlLabel>
    <Cascader plaintext defaultValue="1-1" data={data} style={{ widht: 224 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
