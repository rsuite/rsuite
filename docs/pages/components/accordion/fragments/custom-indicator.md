<!--start-code-->

```js
import { Accordion, Placeholder } from 'rsuite';
import { FaAngleDoubleDown, FaArrowAltCircleDown, FaArrowDown } from 'react-icons/fa';

const App = () => (
  <Accordion defaultActiveKey={1} bordered>
    <Accordion.Panel header="Accordion Panel 1" eventKey={1} caretAs={FaAngleDoubleDown}>
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 2" eventKey={2} caretAs={FaArrowAltCircleDown}>
      <Placeholder.Paragraph />
    </Accordion.Panel>
    <Accordion.Panel header="Accordion Panel 3" eventKey={3} caretAs={FaArrowDown}>
      <Placeholder.Paragraph />
    </Accordion.Panel>
  </Accordion>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
