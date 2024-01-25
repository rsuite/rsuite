<!--start-code-->

```js
import { Accordion, Placeholder } from 'rsuite';

const App = () => (
  <Accordion defaultActiveKey={1} bordered>
    <Accordion.Panel header="Accordion Panel 1" eventKey={1}>
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 2" eventKey={2}>
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 3" eventKey={3}>
      <Placeholder.Paragraph />
    </Accordion.Panel>
  </Accordion>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
