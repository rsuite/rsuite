const panelGroupInstance = (
    <PanelGroup defaultActiveKey="2" accordion>
        <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
        <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
        <Panel header="Panel 3" eventKey="3">Panel 3 content</Panel>
    </PanelGroup>
);

ReactDOM.render(panelGroupInstance, mountNode);
