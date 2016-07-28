
var instance = (
    <ButtonToolbar>
       <Dropdown shape='default' title="Default" block>
            <Dropdown.Item eventKey="A" >Item A</Dropdown.Item>
            <Dropdown.Item eventKey="B" >Item B</Dropdown.Item>
            <Dropdown.Item eventKey="C" >Item C</Dropdown.Item>
            <Dropdown.Item eventKey="D" >Item D</Dropdown.Item>
        </Dropdown>

        <Dropdown shape='default' title="Default" block bothEnds>
            <Dropdown.Item eventKey="A" >Item A</Dropdown.Item>
            <Dropdown.Item eventKey="B" >Item B</Dropdown.Item>
            <Dropdown.Item eventKey="C" >Item C</Dropdown.Item>
            <Dropdown.Item eventKey="D" >Item D</Dropdown.Item>
        </Dropdown>

    </ButtonToolbar>
);
ReactDOM.render(instance, mountNode);
