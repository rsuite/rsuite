const SHAPES = ['default', 'primary', 'success', 'warning', 'danger', 'info', 'link'];

function renderButtonGroup(shape,index){
    return (
        <Dropdown shape={shape}  title={shape} key={index}>
            <Dropdown.Item eventKey="A" >Default Item</Dropdown.Item>
            <Dropdown.Item eventKey="B" active>Active Item</Dropdown.Item>
            <Dropdown.Item eventKey="C" disabled>Disabled Item</Dropdown.Item>
            <Dropdown.Item divider></Dropdown.Item>
            <Dropdown.Item href="http://www.pagurian.com">Link Item</Dropdown.Item>
        </Dropdown>
    );
}
var instance = (
    <ButtonToolbar>
        {SHAPES.map(renderButtonGroup)}
    </ButtonToolbar>
);
ReactDOM.render(instance, mountNode);
