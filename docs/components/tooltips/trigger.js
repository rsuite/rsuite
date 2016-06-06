const tooltip = (
    <Tooltip>
       This is a help <i>tooltip</i> .
    </Tooltip>
);
var instance = (
    <ButtonToolbar>
        <Whisper placement="top" trigger="click" speaker={tooltip}>
            <Button shape='default' >Click</Button>
        </Whisper>
        <Whisper placement="top" trigger="focus" speaker={tooltip}>
            <Button shape='default' >Focus</Button>
        </Whisper>
        <Whisper placement="top" trigger="hover" speaker={tooltip}>
            <Button shape='default' >Hover</Button>
        </Whisper>

    </ButtonToolbar>
);
ReactDOM.render(instance, mountNode);
