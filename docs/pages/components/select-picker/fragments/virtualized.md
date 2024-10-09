<!--start-code-->

```js
import { SelectPicker } from 'rsuite';

const data = Array.from({ length: 10000 }).map((_, index) => {
  return {
    label: `Item ${index} is a long text, Used to test the virtualized list.`,
    value: `Item ${index}`
  };
});

const App = () => (
  <>
    <SelectPicker data={data} style={{ width: 224 }} virtualized />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
