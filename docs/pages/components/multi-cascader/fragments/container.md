<!--start-code-->

```js
/**
 *  PreventOverflowContainer from
 *  https://github.com/rsuite/rsuite/blob/master/docs/components/PreventOverflowContainer.tsx
 */

const placements = ['bottomStart', 'topStart', 'autoVerticalStart'];

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

ReactDOM.render(<App />);
```

<!--end-code-->
