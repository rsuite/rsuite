<!--start-code-->

```js
import { Tabs, Placeholder } from 'rsuite';

const App = () => (
  <Tabs defaultActiveKey="1" vertical appearance="subtle">
    <Tabs.Tab eventKey="1" title="Image">
      <Placeholder.Paragraph graph="image" rows={5} />
    </Tabs.Tab>
    <Tabs.Tab eventKey="2" title="Square">
      <Placeholder.Paragraph graph="square" rows={5} />
    </Tabs.Tab>
    <Tabs.Tab eventKey="3" title="Circle">
      <Placeholder.Paragraph graph="circle" rows={5} />
    </Tabs.Tab>
  </Tabs>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
