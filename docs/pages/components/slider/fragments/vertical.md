<!-- start-code -->

```js
import { Slider, RangeSlider, HStack } from 'rsuite';

const marks = [
  {
    value: 20,
    label: '20%'
  },
  {
    value: 50,
    label: '50%'
  },
  {
    value: 80,
    label: '80%'
  }
];

const App = () => {
  return (
    <HStack spacing={40}>
      <Slider defaultValue={50} vertical progress h={400} />
      <RangeSlider defaultValue={[10, 50]} vertical h={400} />
      <RangeSlider min={0} step={10} max={100} defaultValue={[10, 50]} vertical graduated h={400} />
      <HStack spacing={120}>
        <Slider
          h={400}
          defaultValue={50}
          min={0}
          step={10}
          max={100}
          graduated
          vertical
          progress
          renderMark={mark => {
            return <span>{mark} °C</span>;
          }}
        />
        <Slider defaultValue={50} vertical h={400} progress graduated marks={marks} />
      </HStack>
    </HStack>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
