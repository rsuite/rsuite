<!--start-code-->

```js
import { Popover, Whisper, Button } from 'rsuite';

function PreventOverflowContainer({ children, height = 500 }) {
  const container = React.useRef();
  const content = React.useRef();

  const containerStyle = {
    overflow: 'auto',
    position: 'relative'
  };

  const contentStyle = {
    height: '400%',
    width: '230%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap'
  };

  React.useEffect(() => {
    container.current.scrollTop = content.current.clientHeight / 2 - 60;
    container.current.scrollLeft =
      content.current.clientWidth / 2 - container.current.clientWidth / 2;
  }, [container, content]);

  return (
    <div style={{ ...containerStyle, height }} ref={container}>
      <div style={contentStyle} ref={content}>
        {children(() => container.current)}
      </div>
    </div>
  );
}

const speaker = (
  <Popover title="Title" style={{ width: 200 }}>
    <p>This is a default Popover</p>
    <p>Content</p>
  </Popover>
);

const App = () => (
  <PreventOverflowContainer height={300}>
    {getContainer => (
      <Whisper
        preventOverflow
        trigger="click"
        controlId="control-id-container"
        container={getContainer}
        speaker={speaker}
        placement="auto"
      >
        <Button appearance="primary">Click</Button>
      </Whisper>
    )}
  </PreventOverflowContainer>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
