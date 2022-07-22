<!--start-code-->

```js
import { Slider, RangeSlider } from 'rsuite';

const App = () => (
  <>
    <Slider
      progress
      defaultValue={50}
      onChange={value => {
        console.log(value);
      }}
    />
    <hr />
    <RangeSlider defaultValue={[10, 50]} />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
