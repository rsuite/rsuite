<!-- start-code -->

```js
import { Slider } from 'rsuite';

const labels = ['A', 'B', 'C', 'D'];

const App = () => {
  const [value, setValue] = React.useState(0);
  return (
    <div style={{ width: 200, marginLeft: 20 }}>
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
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!-- end-code -->
