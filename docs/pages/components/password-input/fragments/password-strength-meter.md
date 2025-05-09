<!--start-code-->

```js
import React from 'react';
import { PasswordInput, PasswordStrengthMeter, VStack } from 'rsuite';

const requirements = [
  { re: /[0-9]/ },
  { re: /[a-z]/ },
  { re: /[A-Z]/ },
  { re: /[$&+,:;=?@#|'<>.^*()%!-_]/ }
];

function getStrengthLevel(password) {
  const passed = requirements.reduce((acc, req) => acc + req.re.test(password), 0);
  const hasLength = password.length >= 8;
  // 0: very weak, 1: weak, 2: fair, 3: strong
  if (passed <= 1) return 0;
  if (passed === 2) return 1;
  if (passed === 3) return 2;
  if (passed === requirements.length && hasLength) return 3;
  return 2;
}

const strengthLabels = ['Very weak', 'Weak', 'Fair', 'Strong'];

const App = () => {
  const [value, setValue] = React.useState('');
  const level = getStrengthLevel(value);
  return (
    <VStack w={300}>
      <PasswordInput value={value} onChange={setValue} placeholder="Enter your password" />
      <PasswordStrengthMeter level={level} label={strengthLabels[level]} />
    </VStack>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

<!--end-code-->
