<!--start-code-->

```js
import { Cascader, RadioGroup, Radio } from 'rsuite';

function PreventOverflowContainer({ children, height = 500 }) {
  const container = React.useRef();
  const content = React.useRef();

  const containerStyle = {
    overflow: 'auto',
    position: 'relative'
  };

  const contentStyle = {
    height: '400%',
    width: '230%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap'
  };

  React.useEffect(() => {
    container.current.scrollTop = content.current.clientHeight / 2 - 60;
    container.current.scrollLeft =
      content.current.clientWidth / 2 - container.current.clientWidth / 2;
  }, [container, content]);

  return (
    <div style={{ ...containerStyle, height }} ref={container}>
      <div style={contentStyle} ref={content}>
        {children(() => container.current)}
      </div>
    </div>
  );
}

function mockTreeData(depth, length, labels) {
  const data = [];
  const mock = (list, parentValue, layer = 0) => {
    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? `${parentValue}-${index + 1}` : `${index + 1}`;
      const children = [];
      const row = { label: `${labels[layer]} ${value}`, value };

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}

const data = mockTreeData(3, 3, ['Provincial', 'County', 'Town']);
const placements = ['bottomStart', 'topStart', 'autoVerticalStart'];

const App = () => {
  const [placement, setPlacement] = React.useState('bottomStart');

  return (
    <>
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        value={placement}
        onChange={setPlacement}
      >
        {placements.map(item => (
          <Radio value={item} key={item}>
            {item}
          </Radio>
        ))}
      </RadioGroup>
      <hr />
      <PreventOverflowContainer>
        {getContainer => (
          <Cascader
            preventOverflow
            placement={placement}
            style={{ width: 224 }}
            container={getContainer}
            data={data}
          />
        )}
      </PreventOverflowContainer>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
