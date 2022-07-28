<!--start-code-->

```js
import { ButtonToolbar, Button, DOMHelper } from 'rsuite';

const { addClass, removeClass, toggleClass, hasClass } = DOMHelper;

const App = () => {
  const [html, setHtml] = React.useState('<div class="view"></div>');
  const containerRef = React.useRef();
  const viewRef = React.useRef();
  const viewHtmlCode = () => {
    setHtml(containerRef.current.innerHTML);
  };
  return (
    <div>
      <div>{html}</div>
      <div ref={containerRef}>
        <div className="view" ref={viewRef} />
      </div>
      <hr />
      <ButtonToolbar>
        <Button
          onClick={() => {
            addClass(viewRef.current, 'custom');
            viewHtmlCode();
          }}
        >
          addClass
        </Button>

        <Button
          onClick={() => {
            removeClass(viewRef.current, 'custom');
            viewHtmlCode();
          }}
        >
          removeClass
        </Button>

        <Button
          onClick={() => {
            toggleClass(viewRef.current, 'custom');
            viewHtmlCode();
          }}
        >
          toggleClass
        </Button>
        <Button
          onClick={() => {
            alert(hasClass(viewRef.current, 'custom'));
          }}
        >
          hasClass
        </Button>
      </ButtonToolbar>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
