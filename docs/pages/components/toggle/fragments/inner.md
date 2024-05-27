<!--start-code-->

```js
import { Toggle } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import CloseIcon from '@rsuite/icons/Close';

const App = () => (
  <>
    <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
    <Toggle
      size="lg"
      checkedChildren={<CheckIcon />}
      unCheckedChildren={<CloseIcon />}
      defaultChecked
    />

    <hr />

    <Toggle checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
    <Toggle checkedChildren={<CheckIcon />} unCheckedChildren={<CloseIcon />} defaultChecked />

    <hr />
    <Toggle size="sm" checkedChildren="Open" unCheckedChildren="Close" defaultChecked />
    <Toggle
      size="sm"
      checkedChildren={<CheckIcon />}
      unCheckedChildren={<CloseIcon />}
      defaultChecked
    />
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
