<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton icon={<SearchIcon />} appearance="default" />
    <IconButton icon={<SearchIcon />} appearance="primary" />
    <IconButton icon={<SearchIcon />} appearance="link" />
    <IconButton icon={<SearchIcon />} appearance="subtle" />
    <IconButton icon={<SearchIcon />} appearance="ghost" />
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
