<!--start-code-->

```js
import { TagPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <label>Disabled: </label>
    <TagPicker
      disabled
      data={data}
      defaultValue={['Eugenia']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />

    <label>Disabled option: </label>
    <TagPicker
      data={data}
      defaultValue={['Eugenia']}
      disabledItemValues={['Bryan', 'Linda', 'Nancy']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />
    <label>Read only: </label>
    <TagPicker
      readOnly
      data={data}
      defaultValue={['Eugenia']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />
    <label>Plaintext: </label>
    <TagPicker
      plaintext
      data={data}
      defaultValue={['Eugenia']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
