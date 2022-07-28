<!--start-code-->

```js
import { Rate } from 'rsuite';

const App = () => (
  <>
    <label>Disabled: </label>
    <Rate disabled defaultValue={2.5} allowHalf />

    <hr />
    <label>Read only: </label>
    <Rate readOnly defaultValue={2.5} allowHalf />

    <hr />
    <label>Plaintext: </label>
    <Rate plaintext defaultValue={2.5} allowHalf />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
