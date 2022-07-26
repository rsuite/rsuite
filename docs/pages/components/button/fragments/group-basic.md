<!--start-code-->

```js
import { Button, ButtonToolbar, ButtonGroup } from 'rsuite';

const CustomButtonGroup = ({ appearance }) => (
  <ButtonToolbar>
    <ButtonGroup>
      <Button appearance={appearance}>Left</Button>
      <Button appearance={appearance}>Center</Button>
      <Button appearance={appearance}>Right</Button>
    </ButtonGroup>
  </ButtonToolbar>
);

const App = () => (
  <>
    <CustomButtonGroup />
    <CustomButtonGroup appearance="primary" />
    <CustomButtonGroup appearance="link" />
    <CustomButtonGroup appearance="subtle" />
    <CustomButtonGroup appearance="ghost" />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
