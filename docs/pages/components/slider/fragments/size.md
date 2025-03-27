<!--start-code-->

```js
import { Slider, Box, RadioGroup, Radio, HStack, VStack } from 'rsuite';

const App = () => {
  const [direction, setDirection] = React.useState('horizontal');
  const vertical = direction === 'vertical';
  const sliderProps = {
    defaultValue: 50,
    min: 10,
    step: vertical ? 20 : 10,
    max: 100,
    graduated,
    progress,
    vertical,
    h: vertical ? 200 : undefined,
    w: vertical ? undefined : '100%'
  };

  const v = vertical ? 40 : 20;

  const Stack = vertical ? HStack : VStack;

  return (
    <Box p={20}>
      <RadioGroup
        inline
        name="direction"
        appearance="picker"
        onChange={setDirection}
        value={direction}
      >
        Direction
        <Radio value="horizontal">Horizontal</Radio>
        <Radio value="vertical">Vertical</Radio>
      </RadioGroup>

      <hr />
      <Stack spacing={vertical ? 40 : 20}>
        <Slider size="xs" {...sliderProps} />
        <Slider size="sm" {...sliderProps} />
        <Slider size="md" {...sliderProps} />
        <Slider size="lg" {...sliderProps} />
        <Slider size="xl" {...sliderProps} />
      </Stack>
    </Box>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
