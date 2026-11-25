<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton appearance="default" disabled icon={<SearchIcon />} />
    <IconButton appearance="primary" disabled icon={<SearchIcon />} />
    <IconButton appearance="link" disabled icon={<SearchIcon />} />
    <IconButton appearance="subtle" disabled icon={<SearchIcon />} />
    <IconButton appearance="ghost" disabled icon={<SearchIcon />} />
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
