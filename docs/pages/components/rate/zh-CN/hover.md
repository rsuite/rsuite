### 辅助文字

<!--start-code-->

```js
const textStyle = {
  verticalAlign: 'top',
  lineHeight: '42px',
  display: 'inline-block'
};
const texts = {
  1: '极差',
  2: '差',
  3: '一般',
  4: '满意',
  5: '很满意'
};

const App = () => {
  const [hoverValue, setHoverValue] = React.useState(3);

  return (
    <div>
      <Rate defaultValue={3} onChangeActive={setHoverValue} />{' '}
      <span style={textStyle}>{texts[hoverValue]}</span>
    </div>
  );
};

ReactDOM.render(<App />);
```

<!--end-code-->
