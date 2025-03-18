<!--start-code-->

```js
import { Input, InputGroup } from 'rsuite';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';

const App = () => {
  const [visible, setVisible] = React.useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <InputGroup inside w={300}>
      <Input type={visible ? 'text' : 'password'} />
      <InputGroup.Button onClick={handleChange}>
        {visible ? <VisibleIcon /> : <EyeCloseIcon />}
      </InputGroup.Button>
    </InputGroup>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
