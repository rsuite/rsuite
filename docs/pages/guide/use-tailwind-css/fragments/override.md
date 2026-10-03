<!--start-code-->

```js
const App = () => (
  <ButtonToolbar>
    <Button appearance="primary" className="rounded-full shadow-lg">
      Rounded + Shadow
    </Button>
    <Button appearance="ghost" className="bg-green-500 text-white border-0">
      Custom Green
    </Button>
    <Button appearance="subtle" className="underline italic">
      Underline Italic
    </Button>
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
