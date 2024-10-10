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
      <IconButton icon={<FaBold />} />
      <IconButton icon={<FaItalic />} />
      <IconButton icon={<FaUnderline />} />
      <IconButton icon={<FaStrikethrough />} />
    </ButtonGroup>
    <ButtonGroup>
      <IconButton icon={<FaAlignLeft />} />
      <IconButton icon={<FaAlignCenter />} />
      <IconButton icon={<FaAlignRight />} />
      <IconButton icon={<FaAlignJustify />} />
    </ButtonGroup>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
