<!-- start-code -->

```js
import { Slider, RangeSlider, HStack, InputGroup, NumberInput, Text } from 'rsuite';

function SliderExample() {
  const [value, setValue] = React.useState(0);
  const [committedValue, setCommittedValue] = React.useState(0);

  return (
    <HStack spacing={20} wrap>
      <Slider
        w={400}
        progress
        value={value}
        onChange={setValue}
        onChangeCommitted={setCommittedValue}
      />

      <NumberInput min={0} max={100} w={160} value={value} onChange={setValue} />
      <span>Committed: {committedValue}</span>
    </HStack>
  );
}

function RangeSliderExample() {
  const [value, setValue] = React.useState([10, 50]);
  const [committedValue, setCommittedValue] = React.useState([10, 50]);

  return (
    <HStack spacing={20} wrap>
      <RangeSlider
        w={400}
        progress
        value={value}
        onChange={setValue}
        onChangeCommitted={setCommittedValue}
      />

      <InputGroup w={160}>
        <NumberInput
          min={0}
          max={100}
          value={value[0]}
          onChange={nextValue => {
            const [start, end] = value;
            if (nextValue > end) {
              return;
            }
            setValue([nextValue, end]);
          }}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <NumberInput
          min={0}
          max={100}
          value={value[1]}
          onChange={nextValue => {
            const [start, end] = value;
            if (start > nextValue) {
              return;
            }
            setValue([start, nextValue]);
          }}
        />
      </InputGroup>
      <span>Committed: {committedValue.join(' - ')}</span>
    </HStack>
  );
}

function FixedEndValueExample() {
  const [value, setValue] = React.useState([10, 100]);
  const [committedValue, setCommittedValue] = React.useState([10, 100]);

  return (
    <HStack spacing={20} wrap>
      <RangeSlider
        w={400}
        progress
        value={value}
        onChange={value => {
          setValue([value[0], 100]);
        }}
        onChangeCommitted={setCommittedValue}
      />
      <InputGroup w={160}>
        <NumberInput
          min={0}
          max={100}
          value={value[0]}
          onChange={nextValue => {
            const [start, end] = value;
            if (nextValue > end) {
              return;
            }
            setValue([nextValue, end]);
          }}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <NumberInput min={0} max={100} value={value[1]} disabled />
      </InputGroup>
      <span>Committed: {committedValue.join(' - ')}</span>
    </HStack>
  );
}

const App = () => (
  <>
    <SliderExample />
    <hr />
    <RangeSliderExample />
    <hr />
    <Text mb={10}>Fixed end value</Text>
    <FixedEndValueExample />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
