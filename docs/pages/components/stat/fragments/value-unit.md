<!--start-code-->

```js
import { Stat, HStack } from 'rsuite';

const App = () => (
  <HStack spacing={100}>
    <Stat>
      <Stat.Label> Total Weight </Stat.Label>
      <Stat.Value>
        2,500 <Stat.ValueUnit>KG</Stat.ValueUnit>
      </Stat.Value>
    </Stat>

    <Stat>
      <Stat.Label> Time Remaining </Stat.Label>
      <Stat.Value>
        3 <Stat.ValueUnit>Days</Stat.ValueUnit>
        12 <Stat.ValueUnit>Hours</Stat.ValueUnit>
      </Stat.Value>
    </Stat>
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
