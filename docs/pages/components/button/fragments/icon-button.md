<!--start-code-->

```js
import { IconButton, ButtonToolbar, ButtonGroup } from 'rsuite';

import AlignLeftIcon from '@rsuite/icons/legacy/AlignLeft';
import AlignCenterIcon from '@rsuite/icons/legacy/AlignCenter';
import AlignRightIcon from '@rsuite/icons/legacy/AlignRight';
import AlignJustifyIcon from '@rsuite/icons/legacy/AlignJustify';
import StarIcon from '@rsuite/icons/legacy/Star';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import GooglePlusCircleIcon from '@rsuite/icons/legacy/GooglePlusCircle';
import TwitterIcon from '@rsuite/icons/legacy/Twitter';
import LinkedinIcon from '@rsuite/icons/legacy/Linkedin';
import PauseIcon from '@rsuite/icons/legacy/Pause';
import PlayIcon from '@rsuite/icons/legacy/Play';
import SearchIcon from '@rsuite/icons/Search';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import PlusIcon from '@rsuite/icons/Plus';

const App = () => (
  <>
    <ButtonToolbar>
      <IconButton icon={<StarIcon />} />
      <IconButton icon={<StarIcon />} appearance="primary" />
      <ButtonGroup>
        <IconButton icon={<AlignLeftIcon />} />
        <IconButton icon={<AlignCenterIcon />} />
        <IconButton icon={<AlignRightIcon />} />
        <IconButton icon={<AlignJustifyIcon />} />
      </ButtonGroup>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton size="lg" icon={<StarIcon />} />
      <IconButton size="lg" icon={<SearchIcon />} />
      <IconButton size="md" icon={<StarIcon />} />
      <IconButton size="md" icon={<SearchIcon />} />
      <IconButton size="sm" icon={<StarIcon />} />
      <IconButton size="sm" icon={<SearchIcon />} />
      <IconButton size="xs" icon={<StarIcon />} />
      <IconButton size="xs" icon={<SearchIcon />} />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<FacebookOfficialIcon />} color="blue" appearance="primary" circle />
      <IconButton icon={<GooglePlusCircleIcon />} color="red" appearance="primary" circle />
      <IconButton icon={<TwitterIcon />} color="cyan" appearance="primary" circle />
      <IconButton icon={<LinkedinIcon />} color="blue" appearance="primary" circle />
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<PauseIcon />} placement="left">
        Pause
      </IconButton>
      <IconButton icon={<PlayIcon />} placement="right">
        Next
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton appearance="primary" color="green" icon={<SearchIcon />}>
        Component
      </IconButton>
      <IconButton icon={<AddOutlineIcon />}>Add</IconButton>

      <IconButton icon={<PlusIcon />}>Add</IconButton>
    </ButtonToolbar>
  </>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
