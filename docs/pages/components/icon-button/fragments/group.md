<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';
import BoldIcon from '@rsuite/icons/legacy/Bold';
import ItalicIcon from '@rsuite/icons/legacy/Italic';
import UnderlineIcon from '@rsuite/icons/legacy/Underline';
import StrikethroughIcon from '@rsuite/icons/legacy/Strikethrough';
import AlignLeftIcon from '@rsuite/icons/legacy/AlignLeft';
import AlignCenterIcon from '@rsuite/icons/legacy/AlignCenter';
import AlignRightIcon from '@rsuite/icons/legacy/AlignRight';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';

const App = () => (
  <ButtonToolbar>
    <ButtonGroup>
      <IconButton icon={<BoldIcon />} />
      <IconButton icon={<ItalicIcon />} />
      <IconButton icon={<UnderlineIcon />} />
      <IconButton icon={<StrikethroughIcon />} />
    </ButtonGroup>
    <ButtonGroup>
      <IconButton icon={<AlignLeftIcon />} />
      <IconButton icon={<AlignCenterIcon />} />
      <IconButton icon={<AlignRightIcon />} />
      <IconButton icon={<AlignJustifyIcon />} />
    </ButtonGroup>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
