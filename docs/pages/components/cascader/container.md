### 容器与防止溢出

<!--start-code-->

```js
/**
 *  PreventOverflowContainer from
 *  https://github.com/rsuite/rsuite/blob/master/docs/components/PreventOverflowContainer.tsx
 */

const placements = ['bottomStart', 'topStart', 'autoVerticalStart'];

class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      placement: 'bottomStart'
    };
  }
  render() {
    const { placement } = this.state;
    return (
      <div>
        <RadioGroup
          name="radioList"
          inline
          appearance="picker"
          value={placement}
          onChange={placement => {
            this.setState({ placement });
          }}
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
      </div>
    );
  }
}

ReactDOM.render(<Demo />);
```

<!--end-code-->
