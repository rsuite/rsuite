<!--start-code-->

```js
import { Tree, Panel, InputNumber, Button, SelectPicker, Stack } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.name[methodName[layer]]();
  }
});

const alignData = ['auto', 'smart', 'center', 'end', 'start'].map(item => ({
  label: item,
  value: item
}));

const App = () => {
  const treeRef = React.useRef();
  const [index, setIndex] = React.useState(1);
  const [align, setAlign] = React.useState('start');
  return (
    <div>
      <Panel bordered>
        <Tree data={data} ref={treeRef} defaultExpandAll virtualized />
      </Panel>
      <hr />
      <Stack spacing={6}>
        <InputNumber value={index} onChange={setIndex} style={{ width: 100 }} />
        <SelectPicker data={alignData} value={align} onChange={setAlign} cleanable={false} />
        <Button
          onClick={() => {
            treeRef.current.list.scrollToItem(index, align);
          }}
        >
          scrollToItem
        </Button>
      </Stack>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
