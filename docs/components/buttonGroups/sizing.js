const SIZES = ['lg', 'md', 'sm', 'xs'];

function renderButtonGroup(size,index){
    return (
        <ButtonToolbar key={index} >
            <ButtonGroup size={size} >
                <Button shape="default">Left</Button>
                <Button shape="default">Middle</Button>
                <Button shape="default">Right</Button>
            </ButtonGroup>
        </ButtonToolbar>
    );
}
var instance = (
    <div>
        {SIZES.map(renderButtonGroup)}
    </div>
);
ReactDOM.render(instance, mountNode);
