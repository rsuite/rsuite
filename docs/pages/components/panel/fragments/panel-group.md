<!--start-code-->

```js
import { Panel, PanelGroup, Placeholder } from 'rsuite';

const App = () => (
  <PanelGroup>
    <Panel header="Panel 1">
      <Placeholder.Paragraph />
    </Panel>
    <Panel header="Panel 2">
      <Placeholder.Paragraph />
    </Panel>
    <Panel header="Panel 3">
      <Placeholder.Paragraph />
    </Panel>
  </PanelGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
