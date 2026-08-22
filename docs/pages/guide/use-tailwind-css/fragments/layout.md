<!--start-code-->

```js
const App = () => (
  <div className="flex gap-4">
    <Panel bordered className="flex-1 text-center">
      <Text>Panel A</Text>
    </Panel>
    <Panel bordered className="flex-1 text-center">
      <Text>Panel B</Text>
    </Panel>
    <Panel bordered className="flex-1 text-center">
      <Text>Panel C</Text>
    </Panel>
  </div>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
