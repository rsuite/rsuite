### Accordion effect

Only one panel can be expanded.

<!--start-code-->

```js
const instance = (
  <PanelGroup accordion defaultActiveKey={1} bordered>
    <Panel header="Panel 1" eventKey={1}>
      <Paragraph />
    </Panel>
    <Panel header="Panel 2" eventKey={2}>
      <Paragraph />
    </Panel>
    <Panel header="Panel 3" eventKey={3}>
      <Paragraph />
    </Panel>
  </PanelGroup>
);
ReactDOM.render(instance);
```

<!--end-code-->
