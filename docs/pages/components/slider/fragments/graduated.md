<!--start-code-->

```js
import { Slider, Box } from 'rsuite';

const App = () => (
  <Box p={20}>
    <Slider defaultValue={50} min={10} step={10} max={100} graduated progress />
    <hr />
    <Slider
      defaultValue={50}
      min={10}
      step={10}
      max={100}
      graduated
      progress
      renderMark={mark => {
        return mark;
      }}
    />
  </Box>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
