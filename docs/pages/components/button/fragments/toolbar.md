<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup, IconButton } from 'rsuite';
import FileTextIcon from '@rsuite/icons/legacy/FileText';
import SaveIcon from '@rsuite/icons/legacy/Save';
import BoldIcon from '@rsuite/icons/legacy/Bold';
import ItalicIcon from '@rsuite/icons/legacy/Italic';
import UnderlineIcon from '@rsuite/icons/legacy/Underline';
import StrikethroughIcon from '@rsuite/icons/legacy/Strikethrough';
import AlignLeftIcon from '@rsuite/icons/legacy/AlignLeft';
import AlignCenterIcon from '@rsuite/icons/legacy/AlignCenter';
import AlignRightIcon from '@rsuite/icons/legacy/AlignRight';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import LinkIcon from '@rsuite/icons/legacy/Link';

const App = () => (
  <>
    <ButtonToolbar>
      <Button>Prev</Button>
      <ButtonGroup>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>4</Button>
        <Button>5</Button>
      </ButtonGroup>
      <Button>Next</Button>
    </ButtonToolbar>
    <ButtonToolbar>
      <IconButton icon={<FileTextIcon />} />
      <IconButton icon={<SaveIcon />} />
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
      <IconButton icon={<LinkIcon />} />
    </ButtonToolbar>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
