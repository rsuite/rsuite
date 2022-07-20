<!--start-code-->

```js
import { AutoComplete } from 'rsuite';

const data = [
  'HYPER Advertiser',
  'HYPER Web Analytics',
  'HYPER Video Analytics',
  'HYPER DMP',
  'HYPER Ad Serving',
  'HYPER Data Discovery'
];
const App = () => (
  <>
    <AutoComplete data={data} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
