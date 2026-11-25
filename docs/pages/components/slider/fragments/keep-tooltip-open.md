<!--start-code-->

```js
import { Slider, RangeSlider } from 'rsuite';

const App = () => (
  <>
    <Slider progress defaultValue={50} keepTooltipOpen />
    <hr />
    <RangeSlider progress defaultValue={[20, 70]} keepTooltipOpen />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
