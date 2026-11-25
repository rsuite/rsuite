<!--start-code-->

```js
import { CheckPicker } from 'rsuite';

const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

const App = () => (
  <>
    <CheckPicker data={data} appearance="default" placeholder="Default" w={224} />
    <hr />
    <CheckPicker data={data} appearance="subtle" placeholder="Subtle" w={224} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
