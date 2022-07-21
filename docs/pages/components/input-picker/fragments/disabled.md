<!--start-code-->

```js
import { InputPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);
const App = () => (
  <div>
    <label>Disabled: </label>
    <InputPicker disabled data={data} defaultValue={'Julia'} />
    <label style={{ marginLeft: 10 }}> Disabled option: </label>
    <InputPicker
      data={data}
      defaultValue={'Julia'}
      disabledItemValues={['Eugenia', 'Bryan', 'Lloyd']}
    />
    <hr />
    <label>Read only: </label>
    <InputPicker readOnly data={data} defaultValue={'Julia'} />

    <hr />
    <label>Plaintext: </label>
    <InputPicker plaintext data={data} defaultValue={'Julia'} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
