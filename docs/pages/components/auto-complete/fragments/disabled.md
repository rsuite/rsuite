<!--start-code-->

```js
import { AutoComplete } from 'rsuite';

const data = [];

const App = () => (
  <div>
    <label>Disabled:</label>
    <AutoComplete data={data} disabled defaultValue="Eugenia" w={224} />
    <hr />
    <label>Read only:</label>
    <AutoComplete data={data} readOnly defaultValue="Eugenia" w={224} />
    <hr />
    <label>Plaintext:</label>
    <AutoComplete data={data} plaintext defaultValue="Eugenia" w={224} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
