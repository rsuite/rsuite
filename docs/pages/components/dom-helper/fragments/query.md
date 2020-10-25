<!--start-code-->

```js
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

ReactDOM.render(<App />);
```

<!--end-code-->
