<!--start-code-->

```jsx
import { InputNumber, Stack } from 'rsuite';

function toThousands(value) {
  return value ? `${value}`.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') : value;
}

function toPercent(value) {
  return `${(value * 100).toFixed(0)}%`;
}

const App = () => (
  <Stack direction="column" alignItems="flex-start" spacing={10}>
    <InputNumber defaultValue={100} formatter={value => `${value} kg`} />
    <InputNumber defaultValue={1.5} step={0.1} formatter={value => `€${value}`} />
    <InputNumber defaultValue={100050000} formatter={toThousands} />
    <InputNumber defaultValue={0.5} min={0} max={1} step={0.01} formatter={toPercent} />
  </Stack>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
