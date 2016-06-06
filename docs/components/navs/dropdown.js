
var instance = (
    <Nav pills >
        <Nav.Item active eventKey="A">Item A</Nav.Item>
        <Nav.Item eventKey="B">Item B</Nav.Item>
        <Nav.Item eventKey="C">Item C</Nav.Item>
        <Nav.Item eventKey="D" >Item D</Nav.Item>
        <Nav.Dropdown eventKey="E" select title="Item E">
            <Nav.Item eventKey="E-1" >Item E-1</Nav.Item>
            <Nav.Item eventKey="E-2" >Item E-2</Nav.Item>
            <Nav.Item eventKey="E-3" >Item E-3</Nav.Item>
            <Nav.Item eventKey="E-4" >Item E-4</Nav.Item>
        </Nav.Dropdown>
    </Nav>
);
ReactDOM.render(instance, mountNode);
