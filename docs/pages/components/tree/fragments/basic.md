<!--start-code-->

```js
import { Tree, Panel, InputNumber, Button } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const App = () => {
  const treeRef = React.useRef();
  const [index, setIndex] = React.useState(1);
  return (
    <div>
      <Panel bordered>
        <Tree data={data} ref={treeRef} defaultExpandAll virtualized />
      </Panel>
      <hr />
      <div style={{ justifyContent: 'flex-start', display: 'flex' }}>
        <InputNumber value={index} onChange={setIndex} style={{ width: 100, marginRight: 10 }} />
        <Button
          onClick={() => {
            treeRef.current.list.scrollToIndex(parseInt(index, 10));
          }}
        >
          scrollToIndex
        </Button>
      </div>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
