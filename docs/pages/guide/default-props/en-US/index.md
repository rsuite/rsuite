# Default Props

React Suite allows you to set default props for components globally using the `CustomProvider` component. This is useful when you want to maintain consistent styling and behavior across your application without having to specify the same props repeatedly.

## Basic Usage

To set default props for components, use the `components` prop of the `CustomProvider` component. The `components` prop accepts an object where the keys are component names and the values are objects containing default props for those components.

```jsx
import { CustomProvider } from 'rsuite';

const components = {
  Button: {
    defaultProps: { size: 'sm' }
  },
  Input: {
    defaultProps: {
      size: 'sm',
      placeholder: 'Enter a value...'
    }
  }
  // More components...
};

function App() {
  return (
    <CustomProvider components={components}>{/* Your application components */}</CustomProvider>
  );
}
```

## Component-Specific Defaults

You can set default props for any React Suite component. Here are some common examples:

### Setting Default Size

```jsx
const components = {
  Button: { defaultProps: { size: 'sm' } },
  Input: { defaultProps: { size: 'sm' } },
  SelectPicker: { defaultProps: { size: 'sm' } }
  // ...
};
```

### Setting Default Appearance for Button

```jsx
const components = {
  Button: { defaultProps: { appearance: 'ghost' } }
  // ...
};
```

### Disable Searchable for All Picker Components

```jsx
const components = {
  SelectPicker: {
    defaultProps: {
      searchable: false
    }
  },
  CheckPicker: {
    defaultProps: {
      searchable: false
    }
  },
  TagPicker: {
    defaultProps: {
      searchable: false
    }
  }
  // ...
};
```

## Overriding Defaults

Default props can be overridden at the component level by explicitly passing props to individual components:

```jsx
// In your CustomProvider configuration
const components = {
  Button: { defaultProps: { size: 'sm', appearance: 'ghost' } }
  // ...
};

// In your component
<Button size="lg" appearance="primary">
  This button overrides the defaults
</Button>;
```

## Complete Example

Here's a complete example of setting up default props for multiple components:

```jsx
import React from 'react';
import { CustomProvider, Button, Input, SelectPicker } from 'rsuite';

const components = {
  // Button defaults
  Button: {
    defaultProps: {
      size: 'sm',
      appearance: 'ghost'
    }
  },

  // Input defaults
  Input: {
    defaultProps: {
      size: 'sm',
      placeholder: 'Please enter...'
    }
  },

  // SelectPicker defaults
  SelectPicker: {
    defaultProps: {
      size: 'sm',
      placeholder: 'Select an option',
      searchable: false,
      cleanable: false,
      virtualized: true
    }
  }

  // Add more components as needed
};

function App() {
  return (
    <CustomProvider components={components}>
      <div>
        <Button>Default Button</Button>
        <Input />
        <SelectPicker
          data={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' }
          ]}
        />
      </div>
    </CustomProvider>
  );
}

export default App;
```
