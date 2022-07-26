<!--start-code-->

```js
import { Rate } from 'rsuite';
import { Icon } from '@rsuite/icons';
import HeartIcon from '@rsuite/icons/legacy/Heart';

const App = () => {
  const [value, setValue] = React.useState(2.5);

  return (
    <>
      <div>
        <Rate allowHalf value={value} character={<HeartIcon />} color="red" onChange={setValue} />
      </div>
      <div>
        <Rate allowHalf value={value} character="鼎" color="blue" onChange={setValue} />
      </div>
      <div>
        <Rate allowHalf value={value} character="A" onChange={setValue} />
      </div>
      <div>
        <Rate allowHalf value={value} character="👍" onChange={setValue} />
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
