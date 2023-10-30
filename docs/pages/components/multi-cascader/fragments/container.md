<!--start-code-->

```js
import { MultiCascader, RadioGroup, Radio } from 'rsuite';
import { mockTreeData } from './mock';

const data = mockTreeData({
  limits: [3, 3, 4],
  labels: (layer, value, faker) => {
    const methodName = ['jobArea', 'jobType', 'firstName'];
    return faker.person[methodName[layer]]();
  }
});
const placements = ['bottomStart', 'topStart', 'autoVerticalStart'];

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

const App = () => {
  const [placement, setPlacement] = React.useState('bottomStart');

  return (
    <div>
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
          <MultiCascader
            preventOverflow
            placement={placement}
            style={{ width: 224 }}
            container={getContainer}
            data={data}
          />
        )}
      </PreventOverflowContainer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
