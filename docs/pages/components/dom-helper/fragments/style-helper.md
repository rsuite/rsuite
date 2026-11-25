<!--start-code-->

```js
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';

const { addStyle, removeStyle, getStyle } = DOMHelper;

const App = () => {
  const [html, setHtml] = React.useState('<div class="view"></div>');
  const containerRef = React.useRef();
  const viewRef = React.useRef();

  const viewHtmlCode = () => {
    setHtml(containerRef.current.innerHTML);
  };
  return (
    <div>
      <div> {html}</div>
      <div ref={containerRef}>
        <div className="view" ref={viewRef} />
      </div>
      <hr />
      <ButtonToolbar>
        <Button
          onClick={() => {
            addStyle(viewRef.current, {
              'font-size': '16px',
              color: '#F00'
            });
            viewHtmlCode();
          }}
        >
          addStyle
        </Button>

        <Button
          onClick={() => {
            removeStyle(viewRef.current, ['font-size', 'color']);
            viewHtmlCode();
          }}
        >
          removeStyle
        </Button>

        <Button
          onClick={() => {
            console.log(getStyle(viewRef.current));
            alert(getStyle(viewRef.current, 'font-size'));
          }}
        >
          getStyle
        </Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
