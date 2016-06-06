const SIZES = ['lg', 'md', 'sm', 'xs'];

function renderButtonGroup(size,index){
    return (
        <ButtonToolbar key={index} >
            <Dropdown size={size} title={'Default ' + size }  shape='default'>
                <Dropdown.Item eventKey="A" >Default Item</Dropdown.Item>
                <Dropdown.Item eventKey="B" active>Active Item</Dropdown.Item>
                <Dropdown.Item eventKey="C" disabled>Disabled Item</Dropdown.Item>
                <Dropdown.Item divider></Dropdown.Item>
                <Dropdown.Item href="http://www.pagurian.com">Link Item</Dropdown.Item>
            </Dropdown>
        </ButtonToolbar>
    );
}
var instance = (
    <div>
        {SIZES.map(renderButtonGroup)}
    </div>
);
ReactDOM.render(instance, mountNode);
