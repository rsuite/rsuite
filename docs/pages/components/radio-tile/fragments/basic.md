<!--start-code-->

```js
import { RadioTile, RadioTileGroup } from 'rsuite';
import { Icon } from '@rsuite/icons';
import { VscLock, VscWorkspaceTrusted, VscRepo } from 'react-icons/vsc';

const App = () => (
  <RadioTileGroup defaultValue="private" aria-label="Visibility Level">
    <RadioTile icon={<Icon as={VscLock} />} label="Private" value="private">
      Project access must be granted explicitly to each user. If this project is part of a group,
      access will be granted to members of the group.
    </RadioTile>
    <RadioTile icon={<Icon as={VscWorkspaceTrusted} />} label="Internal" value="internal">
      The project can be accessed by any logged in user except external users.
    </RadioTile>

    <RadioTile icon={<Icon as={VscRepo} />} label="Public" value="public">
      The project can be accessed without any authentication.
    </RadioTile>
  </RadioTileGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
