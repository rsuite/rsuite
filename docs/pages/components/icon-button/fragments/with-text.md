<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import PlusIcon from '@rsuite/icons/Plus';

ReactDOM.render(
  <>
    <ButtonToolbar>
      <IconButton icon={<SearchIcon />}>Search</IconButton>
      <IconButton appearance="primary" color="green" icon={<SearchIcon />}>
        Search
      </IconButton>
    </ButtonToolbar>

    <ButtonToolbar>
      <IconButton icon={<AddOutlineIcon />}>Create</IconButton>
      <IconButton icon={<PlusIcon />}>Add</IconButton>
    </ButtonToolbar>
  </>,
  document.getElementById('root')
);
```

<!--end-code-->
