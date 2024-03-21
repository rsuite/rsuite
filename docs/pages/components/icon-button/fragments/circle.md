<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton circle icon={<SearchIcon />} appearance="default" />
    <IconButton circle icon={<SearchIcon />} appearance="primary" />
    <IconButton circle icon={<SearchIcon />} appearance="link" />
    <IconButton circle icon={<SearchIcon />} appearance="subtle" />
    <IconButton circle icon={<SearchIcon />} appearance="ghost" />
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
