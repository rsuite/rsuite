<!--start-code-->

```jsx
import { PinInput } from 'rsuite';

const App = () => {
  const [value, setValue] = React.useState('');
  return <PinInput value={value} onChange={setValue} onComplete={value => console.log(value)} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
