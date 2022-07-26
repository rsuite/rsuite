<!--start-code-->

```js
import { Rate } from 'rsuite';

const textStyle = {
  verticalAlign: 'top',
  lineHeight: '42px',
  display: 'inline-block'
};

const texts = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent'
};

const App = () => {
  const [hoverValue, setHoverValue] = React.useState(3);

  return (
    <>
      <Rate defaultValue={3} onChangeActive={setHoverValue} />{' '}
      <span style={textStyle}>{texts[hoverValue]}</span>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
