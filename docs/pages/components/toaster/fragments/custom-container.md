<!--start-code-->

```js
import React from 'react';
import { useToaster, ButtonToolbar, SelectPicker, Button } from 'rsuite';

const App = () => {
  const toaster = useToaster();
  const container = React.useRef();

  const handleFullScreen = () => {
    container.current.requestFullscreen();
  };

  return (
    <div style={{ backgroundColor: '#fff' }} ref={container}>
      <ButtonToolbar>
        <Button onClick={handleFullScreen}>Full Screen</Button>
        <Button
          onClick={() =>
            toaster.push(
              <Message showIcon type='success' closable>
                rendered in custom container
              </Message>,
              { container: () => document.fullscreenElement }
            )
          }
          appearance="primary"
        >
          Push
        </Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
