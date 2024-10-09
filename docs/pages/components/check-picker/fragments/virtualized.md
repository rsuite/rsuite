<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = Array.from({ length: 10000 }).map((_, index) => {
  return {
    label: `Item ${index} is a long text, Used to test the virtualized list.`,
    value: `Item ${index}`
  };
});

const App = () => (
  <>
    <CheckPicker data={data} style={{ width: 224 }} virtualized />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
