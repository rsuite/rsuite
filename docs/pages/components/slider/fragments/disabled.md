<!--start-code-->

```js
import { Slider } from 'rsuite';

const App = () => (
  <>
    <label>Disabled: </label>
    <Slider disabled defaultValue={50} min={0} step={10} max={100} graduated progress />
    <hr />
    <label>Read only: </label>
    <Slider readOnly defaultValue={50} min={0} step={10} max={100} graduated progress />

    <hr />
    <label>Plaintext: </label>
    <Slider plaintext defaultValue={50} min={0} step={10} max={100} graduated progress />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
