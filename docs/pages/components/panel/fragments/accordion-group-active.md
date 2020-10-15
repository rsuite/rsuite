<!--start-code-->

```js
const instance = (
  <PanelGroup accordion defaultActiveKey={1} bordered>
    <Panel header="Panel 1" eventKey={1} id="panel1">
      <Paragraph />
    </Panel>
    <Panel header="Panel 2" eventKey={2} id="panel2">
      <Paragraph />
    </Panel>
    <Panel header="Panel 3" eventKey={3} id="panel3">
      <Paragraph />
    </Panel>
  </PanelGroup>
);
ReactDOM.render(instance);
```

<!--end-code-->
