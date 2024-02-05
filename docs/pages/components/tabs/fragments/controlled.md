<!--start-code-->

```js
import { Tabs, Placeholder, ButtonGroup, Button, Panel } from 'rsuite';

const App = () => {
  const [activeKey, setActiveKey] = React.useState('image');

  return (
    <Panel>
      <ButtonGroup>
        {['image', 'square', 'circle'].map(key => (
          <Button key={key} active={key === activeKey} onClick={() => setActiveKey(key)}>
            {key}
          </Button>
        ))}
      </ButtonGroup>
      <hr />
      <Tabs activeKey={activeKey} onSelect={setActiveKey}>
        <Tabs.Tab eventKey="image" title="Image">
          <Placeholder.Paragraph graph="image" />
        </Tabs.Tab>
        <Tabs.Tab eventKey="square" title="Square">
          <Placeholder.Paragraph graph="square" />
        </Tabs.Tab>
        <Tabs.Tab eventKey="circle" title="Circle">
          <Placeholder.Paragraph graph="circle" />
        </Tabs.Tab>
      </Tabs>
    </Panel>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
