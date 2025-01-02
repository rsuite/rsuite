<!--start-code-->

```js
import { useToaster, ButtonToolbar, Button, Message } from 'rsuite';

const App = () => {
  const toaster = useToaster();
  const container = React.useRef();

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.current.requestFullscreen();
    }
  };

  const pushMessage = () => {
    toaster.push(
      <Message showIcon type="success" closable>
        rendered in custom container
      </Message>,
      { container: document.fullscreenElement }
    );
  };

  return (
    <div ref={container}>
      <ButtonToolbar>
        <Button onClick={toggleFullScreen}>Full Screen</Button>
        <Button onClick={pushMessage} appearance="primary">
          Push
        </Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
