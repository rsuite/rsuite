<!--start-code-->

```js
import { Button, ButtonGroup } from 'rsuite';

const CustomButtonGroup = ({ appearance }) => (
  <ButtonGroup style={{ marginTop: 12 }} justified>
    <Button appearance={appearance}>Top</Button>
    <Button appearance={appearance}>Middle</Button>
    <Button appearance={appearance}>Bottom</Button>
  </ButtonGroup>
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
