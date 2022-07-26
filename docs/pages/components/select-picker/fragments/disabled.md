<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <label>Disabled: </label>
    <SelectPicker disabled data={data} defaultValue={'Bryan'} style={{ width: 224 }} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <SelectPicker
      data={data}
      style={{ width: 224 }}
      defaultValue={'Bryan'}
      disabledItemValues={['Nancy', 'Alice', 'Julia']}
    />
    <hr />
    <label>Read only: </label>
    <SelectPicker readOnly data={data} defaultValue={'Bryan'} style={{ width: 224 }} />

    <hr />
    <label>Plaintext: </label>
    <SelectPicker plaintext data={data} defaultValue={'Bryan'} style={{ width: 224 }} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
