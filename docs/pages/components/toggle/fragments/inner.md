<!--start-code-->

```js
import { Toggle } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

const App = () => (
  <>
    <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" />
    <Toggle checkedChildren={<CheckIcon />} unCheckedChildren={<CloseIcon />} />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
