<!--start-code-->

```jsx
import { Button, useDialog } from 'rsuite';

const App = () => {
  const dialog = useDialog();

  const handleEmailPrompt = async () => {
    const email = await dialog.prompt('Please enter your email address:', {
      title: 'Email Validation',
      defaultValue: '',
      validate: value => {
        // Simple email validation
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        return [isValid, 'Please enter a valid email address'];
      }
    });

    if (typeof email === 'string') {
      dialog.alert(`You entered: ${email}`);
    } else {
      console.log('Prompt cancelled');
    }
  };

  return <Button onClick={handleEmailPrompt}>Prompt with Validation</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
