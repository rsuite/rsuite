<!--start-code-->

```jsx
import { NumberInput, VStack } from 'rsuite';

function toThousands(value) {
  return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') : value;
}

function toPercent(value) {
  return `${(value * 100).toFixed(0)}%`;
}

const App = () => (
  <VStack spacing={10} w={200}>
    <NumberInput defaultValue={100} formatter={value => `${value} kg`} />
    <NumberInput defaultValue={1.5} step={0.1} formatter={value => `€${value}`} />
    <NumberInput defaultValue={100050000} formatter={toThousands} />
    <NumberInput defaultValue={0.5} min={0} max={1} step={0.01} formatter={toPercent} />
  </VStack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
