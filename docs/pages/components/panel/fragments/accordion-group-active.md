<!--start-code-->

```js
import { Panel, PanelGroup, Placeholder } from 'rsuite';

const App = () => (
  <PanelGroup accordion defaultActiveKey={1} bordered>
    <Panel header="Panel 1" eventKey={1} id="panel1">
      <Placeholder.Paragraph />
    </Panel>
    <Panel header="Panel 2" eventKey={2} id="panel2">
      <Placeholder.Paragraph />
    </Panel>
    <Panel header="Panel 3" eventKey={3} id="panel3">
      <Placeholder.Paragraph />
    </Panel>
  </PanelGroup>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
