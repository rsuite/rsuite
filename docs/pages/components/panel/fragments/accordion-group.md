<!--start-code-->

```js
import { PanelGroup, Panel, Placeholder } from 'rsuite';

const App = () => (
  <PanelGroup accordion bordered>
    <Panel header="Panel 1" defaultExpanded>
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
