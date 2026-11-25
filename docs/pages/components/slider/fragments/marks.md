<!--start-code-->

```js
import { Slider, Box, HStack } from 'rsuite';

const marks = [
  {
    value: 256,
    label: '256 GB'
  },
  {
    value: 1024,
    label: '1 TB'
  },
  {
    value: 2048,
    label: '2 TB'
  }
];

const App = () => (
  <HStack p={20} spacing={16} wrap>
    <label>Memory size</label>
    <Slider
      defaultValue={512}
      graduated
      progress
      max={2000}
      marks={marks}
      w={500}
      keepTooltipOpen
      renderTooltip={value => `${value}GB`}
    />
  </HStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
