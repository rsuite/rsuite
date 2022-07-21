<!--start-code-->

```js
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';

const { scrollTop } = DOMHelper;

const App = () => {
  return (
    <div>
      <ButtonToolbar>
        <Button
          onClick={() => {
            scrollTop(window, 1500);
          }}
        >
          scrollTop 1500
        </Button>

        <Button
          onClick={() => {
            alert(scrollTop(window));
          }}
        >
          get scrollTop
        </Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
