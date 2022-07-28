<!--start-code-->

```js
import { Checkbox } from 'rsuite';

const App = () => (
  <>
    <label>Disabled: </label>
    <Checkbox disabled> Default</Checkbox>
    <Checkbox defaultChecked disabled>
      Checked
    </Checkbox>
    <hr />
    <label>Read only: </label>
    <Checkbox readOnly> Default</Checkbox>
    <Checkbox defaultChecked readOnly>
      Checked
    </Checkbox>
    <hr />
    <label>Plaintext: </label>
    <Checkbox plaintext> Default</Checkbox>
    <Checkbox defaultChecked plaintext>
      Checked
    </Checkbox>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
