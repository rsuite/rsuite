<!--start-code-->

```js
import { Stat } from 'rsuite';

const App = () => (
  <Stat>
    <Stat.Label info="Page views is the total number of times the page has been viewed." uppercase>
      Page Views
    </Stat.Label>
    <Stat.Value>4,394</Stat.Value>
  </Stat>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
