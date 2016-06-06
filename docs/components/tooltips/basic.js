const tooltip = (
    <Tooltip>
       This is a help <i>tooltip</i> .
    </Tooltip>
);
var instance = (
    <ButtonToolbar>
        <Whisper placement="top" speaker={tooltip} >
            <Button shape='default' >Top</Button>
        </Whisper>
        <Whisper placement="bottom" speaker={tooltip}>
            <Button shape='default' >Bottom</Button>
        </Whisper>
        <Whisper placement="left" speaker={tooltip}>
            <Button shape='default' >Left</Button>
        </Whisper>
        <Whisper placement="right" speaker={tooltip}>
            <Button shape='default' >Right</Button>
        </Whisper>

        <Whisper placement="right" speaker={tooltip}>
            <Button shape='link' >Link</Button>
        </Whisper>
    </ButtonToolbar>
);
ReactDOM.render(instance, mountNode);
