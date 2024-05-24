<!--start-code-->

```js
import { Tree, Panel, InputNumber, Button, Stack } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [10, 10, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});

const App = () => {
  const listRef = React.useRef();
  const [index, setIndex] = React.useState(1);
  const [align, setAlign] = React.useState('start');
  return (
    <div>
      <Panel bordered>
        <Tree data={data} listRef={listRef} defaultExpandAll virtualized scrollShadow />
      </Panel>
      <hr />
      <Stack spacing={6}>
        <Button
          onClick={() => {
            /**
             * @see https://react-window.vercel.app/#/examples/list/scroll-to-item
             */
            listRef.current?.scrollToItem(index, 'auto');
          }}
        >
          ScrollTo:
        </Button>
        <InputNumber value={index} onChange={setIndex} style={{ width: 60 }} /> Item
      </Stack>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
