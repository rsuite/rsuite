### Collapse Panel Group

<!--start-code-->

```js
const instance = (
  <PanelGroup accordion bordered>
    <Panel header="Panel 1" defaultExpanded>
      <Paragraph />
    </Panel>
    <Panel header="Panel 2">
      <Paragraph />
    </Panel>
    <Panel header="Panel 3">
      <Paragraph />
    </Panel>
  </PanelGroup>
);
ReactDOM.render(instance);
```

<!--end-code-->
