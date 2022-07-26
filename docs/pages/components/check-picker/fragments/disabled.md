<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);
const App = () => (
  <>
    <label>Disabled: </label>
    <CheckPicker disabled data={data} defaultValue={['Julius']} />

    <label style={{ marginLeft: 10 }}>Disabled option: </label>
    <CheckPicker
      data={data}
      defaultValue={['Julius']}
      style={{ width: 224 }}
      disabledItemValues={['Eugenia', 'Travon', 'Vincenza']}
    />
    <hr />
    <label>Read only: </label>
    <CheckPicker readOnly data={data} defaultValue={['Julius']} />

    <hr />
    <label>Plaintext: </label>
    <CheckPicker plaintext data={data} defaultValue={['Julius']} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
