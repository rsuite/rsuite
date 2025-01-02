<!--start-code-->

```js
import { Rate } from 'rsuite';
import { FaBeer } from "react-icons/fa";

const App = () => (
  <Rate defaultValue={2.5} allowHalf vertical character={<FaBeer />} color="blue" />
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
