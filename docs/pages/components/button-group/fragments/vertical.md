<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';

const CustomButtonGroup = ({ appearance }) => (
  <ButtonGroup vertical>
    <Button appearance={appearance}>Top</Button>
    <Button appearance={appearance}>Middle</Button>
    <Button appearance={appearance}>Bottom</Button>
  </ButtonGroup>
);

const App = () => (
  <ButtonToolbar>
    <CustomButtonGroup />
    <CustomButtonGroup appearance="primary" />
    <CustomButtonGroup appearance="link" />
    <CustomButtonGroup appearance="subtle" />
    <CustomButtonGroup appearance="ghost" />
  </ButtonToolbar>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
