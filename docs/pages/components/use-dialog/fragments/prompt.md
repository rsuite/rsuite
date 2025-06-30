<!--start-code-->

```jsx
import { Button, useDialog } from 'rsuite';

const App = () => {
  const dialog = useDialog();

  const handleClick = async () => {
    const value = await dialog.prompt('Please enter your name:');

    if (typeof value === 'string') {
      dialog.alert('Name entered: ' + value);
    } else {
      console.log('Prompt cancelled');
    }
  };

  return <Button onClick={handleClick}>Prompt</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
