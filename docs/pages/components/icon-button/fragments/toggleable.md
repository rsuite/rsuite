<!--start-code-->

```js
import { Button, ButtonGroup } from 'rsuite';
import { FaItalic, FaBold, FaUnderline, FaStrikethrough } from 'react-icons/fa6';

const App = () => (
  <ButtonGroup>
    <IconButton icon={<FaBold />} toggleable />
    <IconButton icon={<FaItalic />} toggleable />
    <IconButton icon={<FaUnderline />} toggleable />
    <IconButton icon={<FaStrikethrough />} toggleable />
  </ButtonGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
