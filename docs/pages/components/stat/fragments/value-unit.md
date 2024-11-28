<!--start-code-->

```js
import { Stat } from 'rsuite';

const App = () => (
  <Stat>
    <Stat.Label> Total Weight </Stat.Label>
    <Stat.Value>
      2,500 <Stat.ValueUnit>KG</Stat.ValueUnit>
    </Stat.Value>
  </Stat>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
