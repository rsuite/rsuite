<!--start-code-->

```js
import { Accordion, Placeholder } from 'rsuite';

const App = () => (
  <Accordion>
    <Accordion.Panel header="Accordion Panel 1" defaultExpanded>
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 2">
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 3">
      <Placeholder.Paragraph />
    </Accordion.Panel>
  </Accordion>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
