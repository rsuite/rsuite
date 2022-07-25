<!--start-code-->

```js
import { Tooltip, Whisper } from 'rsuite';

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

const App = () => (
  <PreventOverflowContainer height={300}>
    {getContainer => (
      <Whisper
        controlId="control-id-container"
        preventOverflow
        trigger="click"
        container={getContainer}
        speaker={
          <Tooltip style={{ width: 120 }}>
            This is a <i>tooltip</i> .
          </Tooltip>
        }
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
