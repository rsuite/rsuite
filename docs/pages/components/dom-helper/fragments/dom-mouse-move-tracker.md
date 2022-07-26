<!--start-code-->

```js
import { Button, DOMHelper } from 'rsuite';

const { DOMMouseMoveTracker } = DOMHelper;

const App = () => {
  const [left, setLeft] = React.useState(0);
  const [top, setTop] = React.useState(0);

  const mouseMoveTracker = React.useRef();

  const onMove = React.useCallback((deltaX, deltaY) => {
    setLeft(x => x + deltaX);
    setTop(y => y + deltaY);
  }, []);

  const onMoveEnd = React.useCallback(() => {
    if (mouseMoveTracker.current) {
      mouseMoveTracker.current.releaseMouseMoves();
    }
  }, []);

  const getMouseMoveTracker = React.useCallback(() => {
    return mouseMoveTracker.current || new DOMMouseMoveTracker(onMove, onMoveEnd, document.body);
  }, []);

  const handleMouseDown = React.useCallback(event => {
    mouseMoveTracker.current = getMouseMoveTracker();
    mouseMoveTracker.current.captureMouseMoves(event);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {left}, {top}
      <Button
        appearance="primary"
        style={{ position: 'absolute', left, top }}
        onMouseDown={handleMouseDown}
      >
        Drag me
      </Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
