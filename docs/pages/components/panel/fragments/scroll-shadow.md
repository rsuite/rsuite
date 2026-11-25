<!--start-code-->

```js
import { Panel, Placeholder } from 'rsuite';

const bodyProps = {
  style: {
    height: 300
  }
};

const App = () => (
  <Panel header="Scroll Shadow" scrollShadow bodyProps={bodyProps}>
    <div style={{ padding: 20 }}>
      <Placeholder.Paragraph rows={20} graph="image" />
      <Placeholder.Paragraph rows={20} graph="image" />
      <Placeholder.Paragraph rows={20} graph="image" />
      <Placeholder.Paragraph rows={20} graph="image" />
      <Placeholder.Paragraph rows={20} graph="image" />
      <Placeholder.Paragraph rows={20} graph="image" />
    </div>
  </Panel>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
