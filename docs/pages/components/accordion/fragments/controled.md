<!--start-code-->

```js
import { Accordion, Placeholder, ButtonGroup, Button } from 'rsuite';

const App = () => {
  const [activeKey, setActiveKey] = React.useState(1);

  return (
    <>
      <ButtonGroup>
        {[1, 2, 3].map(key => (
          <Button key={key} active={key === activeKey} onClick={() => setActiveKey(key)}>
            Expand Item {key}
          </Button>
        ))}
      </ButtonGroup>
      <hr />
      <Accordion activeKey={activeKey} bordered onSelect={setActiveKey}>
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
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
