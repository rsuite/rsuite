<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import {
  FaItalic,
  FaBold,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify
} from 'react-icons/fa6';

const App = () => (
  <ButtonToolbar>
    <ButtonGroup>
      <IconButton icon={<FaBold />} toggleable />
      <IconButton icon={<FaItalic />} toggleable />
      <IconButton icon={<FaUnderline />} toggleable />
      <IconButton icon={<FaStrikethrough />} toggleable />
    </ButtonGroup>
    <ButtonGroup>
      <IconButton icon={<FaAlignLeft />} toggleable />
      <IconButton icon={<FaAlignCenter />} toggleable />
      <IconButton icon={<FaAlignRight />} toggleable />
      <IconButton icon={<FaAlignJustify />} toggleable />
    </ButtonGroup>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
