<!--start-code-->

```js
import { CheckTreePicker } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({ limits: [1, 2, 2], labels: ['Provincial', 'County', 'Town'] });

const Label = props => {
  return <label style={{ width: 120, display: 'inline-block', marginTop: 10 }} {...props} />;
};

const App = () => (
  <>
    <Label>Disabled: </Label>
    <CheckTreePicker disabled data={data} defaultValue={[24]} style={{ width: 220 }} />
    <br />
    <Label>Disabled option: </Label>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      disabledItemValues={['1-1', '1-1-2']}
      defaultValue={[24]}
      style={{ width: 220 }}
    />
    <br />
    <Label>Uncheckable: </Label>
    <CheckTreePicker
      defaultExpandAll
      data={data}
      uncheckableItemValues={['1-1', '1-1-2']}
      defaultValue={[24]}
      style={{ width: 220 }}
    />

    <hr />
    <Label>Read only: </Label>
    <CheckTreePicker readOnly data={data} defaultValue={[24]} style={{ width: 220 }} />
    <hr />
    <Label>Plaintext: </Label>
    <CheckTreePicker plaintext data={data} defaultValue={[24]} style={{ width: 220 }} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
