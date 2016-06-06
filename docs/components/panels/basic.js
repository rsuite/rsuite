const title = (
    <h3>Panel title</h3>
);

const panelsInstance = (
    <div>
        <Panel header={title} shape="default">
            Panel content
        </Panel>

        <Panel header={title} shape="primary">
            Panel content
        </Panel>

        <Panel header={title} shape="success">
            Panel content
        </Panel>

        <Panel header={title} shape="info">
            Panel content
        </Panel>

        <Panel header={title} shape="warning">
            Panel content
        </Panel>

        <Panel header={title} shape="danger">
            Panel content
        </Panel>
    </div>
);

ReactDOM.render(panelsInstance, mountNode);
