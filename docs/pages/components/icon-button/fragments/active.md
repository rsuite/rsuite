<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton appearance="default" active icon={<SearchIcon />} />
    <IconButton appearance="primary" active icon={<SearchIcon />} />
    <IconButton appearance="link" active icon={<SearchIcon />} />
    <IconButton appearance="subtle" active icon={<SearchIcon />} />
    <IconButton appearance="ghost" active icon={<SearchIcon />} />
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
