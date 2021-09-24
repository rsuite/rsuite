<!--start-code-->

```js
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

ReactDOM.render(<App />);
```

<!--end-code-->
