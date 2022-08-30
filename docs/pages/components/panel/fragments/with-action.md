<!--start-code-->

```js
import { Panel, Placeholder, Stack, ButtonGroup, Button } from 'rsuite';

const App = () => (
  <Panel
    bordered
    header={
      <Stack justifyContent="space-between">
        <span>Report Title</span>
        <ButtonGroup>
          <Button active>Day</Button>
          <Button>Week</Button>
          <Button>Month</Button>
        </ButtonGroup>
      </Stack>
    }
  >
    <Placeholder.Paragraph rows={5} graph="image" />
  </Panel>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
