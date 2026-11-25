<!--start-code-->

```js
import { ButtonToolbar, IconButton } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton icon={<SearchIcon />} size="lg" />
    <IconButton icon={<SearchIcon />} size="md" />
    <IconButton icon={<SearchIcon />} size="sm" />
    <IconButton icon={<SearchIcon />} size="xs" />
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
