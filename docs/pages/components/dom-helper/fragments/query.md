<!--start-code-->

```js
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';

const { getOffset, getOffsetParent, getPosition } = DOMHelper;

const App = () => {
  const nodeRef = React.useRef();
  return (
    <div>
      <a ref={nodeRef}>Node</a>
      <ButtonToolbar>
        <Button
          onClick={() => {
            alert(JSON.stringify(getOffset(nodeRef.current)));
          }}
        >
          getOffset
        </Button>

        <Button
          onClick={() => {
            alert(getOffsetParent(nodeRef.current));
          }}
        >
          getOffsetParent
        </Button>

        <Button
          onClick={() => {
            alert(JSON.stringify(getPosition(nodeRef.current)));
          }}
        >
          getPosition
        </Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
