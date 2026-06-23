<!--start-code-->

```js
const App = () => (
  <ButtonToolbar>
    <Button appearance="primary" className="shadow-lg hover:shadow-xl transition-shadow">
      Primary Button
    </Button>
    <Button appearance="ghost" className="rounded-full">
      Ghost Button
    </Button>
    <Button appearance="link" className="underline-offset-4">
      Link Button
    </Button>
  </ButtonToolbar>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
