<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton appearance="default" loading icon={<SearchIcon />} />
    <IconButton appearance="primary" loading icon={<SearchIcon />} />
    <IconButton appearance="link" loading icon={<SearchIcon />} />
    <IconButton appearance="subtle" loading icon={<SearchIcon />} />
    <IconButton appearance="ghost" loading icon={<SearchIcon />} />
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
