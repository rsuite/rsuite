<!--start-code-->

```js
import { Button, ButtonToolbar } from 'rsuite';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import GearIcon from '@rsuite/icons/Gear';

const App = () => (
  <ButtonToolbar>
    <Button startIcon={<AddOutlineIcon />}> Add </Button>
    <Button startIcon={<GearIcon />}> Settings </Button>
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
