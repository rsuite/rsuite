<!--start-code-->

```js
import { Slider, Box, HStack } from 'rsuite';

const marks = [
  {
    value: 256,
    label: '256 GB'
  },
  {
    value: 512,
    label: '512 GB'
  },
  {
    value: 1024,
    label: '1024 GB'
  }
];

const App = () => (
  <HStack p={20} spacing={16}>
    <label>Memory size</label>
    <Slider
      defaultValue={512}
      graduated
      progress
      max={2000}
      marks={marks}
      w={500}
      renderTooltip={value => `${value}GB`}
    />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
