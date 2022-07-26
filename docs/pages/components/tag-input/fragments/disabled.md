<!--start-code-->

```js
import { TagInput } from 'rsuite';

const App = () => (
  <>
    <label>Disabled: </label>
    <TagInput
      disabled
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />

    <hr />
    <label>Read only: </label>
    <TagInput
      readOnly
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
    <hr />
    <label>Plaintext: </label>
    <TagInput
      plaintext
      defaultValue={['Julius']}
      style={{ width: 300 }}
      menuStyle={{ width: 300 }}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
