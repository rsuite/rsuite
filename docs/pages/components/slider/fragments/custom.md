<!-- start-code -->

```js
import { Slider, Box } from 'rsuite';

const labels = ['A', 'B', 'C', 'D'];

const App = () => {
  const [value, setValue] = React.useState(0);
  return (
    <Box w={200} ml={20}>
      <Slider
        min={0}
        max={labels.length - 1}
        value={value}
        className="custom-slider"
        handleStyle={{
          borderRadius: 10,
          color: '#fff',
          fontSize: 12,
          width: 32,
          height: 22
        }}
        graduated
        tooltip={false}
        handleTitle={labels[value]}
        onChange={setValue}
      />
    </Box>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
