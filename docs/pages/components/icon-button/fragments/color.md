<!--start-code-->

```js
import { IconButton, ButtonToolbar } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const App = () => (
  <ButtonToolbar>
    <IconButton color="red" appearance="primary" icon={<SearchIcon />} />
    <IconButton color="orange" appearance="primary" icon={<SearchIcon />} />
    <IconButton color="yellow" appearance="primary" icon={<SearchIcon />} />
    <IconButton color="green" appearance="primary" icon={<SearchIcon />} />
    <IconButton color="cyan" appearance="primary" icon={<SearchIcon />} />
    <IconButton color="blue" appearance="primary" icon={<SearchIcon />} />
    <IconButton color="violet" appearance="primary" icon={<SearchIcon />} />
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
