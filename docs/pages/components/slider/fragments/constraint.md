<!--start-code-->

```js
import { RangeSlider } from 'rsuite';

const App = () => (
  <>
    <RangeSlider
      max={50}
      defaultValue={[10, 40]}
      constraint={([start, end]) => start <= 25 && end >= 35}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
