<!--start-code-->

```js
import { PasswordInput } from 'rsuite';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const App = () => (
  <>
    <PasswordInput
      w={200}
      placeholder="Enter your password"
      renderVisibilityIcon={visible => (visible ? <FaEyeSlash /> : <FaEye />)}
    />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
