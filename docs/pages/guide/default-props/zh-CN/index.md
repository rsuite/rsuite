# 默认属性 (Default Props)

React Suite 允许你使用 `CustomProvider` 组件全局设置组件的默认属性。当你希望在整个应用程序中保持一致的样式和行为，而不必重复指定相同的属性时，这非常有用。

## 基本用法

要设置组件的默认属性，请使用 `CustomProvider` 组件的 `components` 属性。`components` 属性接受一个对象，其中键是组件名称，值是包含这些组件默认属性的对象。

```jsx
import { CustomProvider } from 'rsuite';

const components = {
  Button: {
    defaultProps: { size: 'sm' }
  },
  Input: {
    defaultProps: {
      size: 'sm',
      placeholder: '请输入...'
    }
  }
  // 更多组件...
};

function App() {
  return <CustomProvider components={components}>{/* 你的应用组件 */}</CustomProvider>;
}
```

## 组件特定的默认值

你可以为任何 React Suite 组件设置默认属性。以下是一些常见示例：

### 设置默认尺寸

```jsx
const components = {
  Button: { defaultProps: { size: 'sm' } },
  Input: { defaultProps: { size: 'sm' } },
  SelectPicker: { defaultProps: { size: 'sm' } }
  // ...
};
```

### 设置按钮的默认外观

```jsx
const components = {
  Button: { defaultProps: { appearance: 'ghost' } }
  // ...
};
```

### 禁用所有 Picker 组件的搜索功能

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

## 覆盖默认值

可以通过显式地向单个组件传递属性来覆盖默认属性：

```jsx
// 在你的 CustomProvider 配置中
const components = {
  Button: { defaultProps: { size: 'sm', appearance: 'ghost' } }
  // ...
};

// 在你的组件中
<Button size="lg" appearance="primary">
  这个按钮覆盖了默认值
</Button>;
```

## 完整示例

以下是设置多个组件默认属性的完整示例：

```jsx
import React from 'react';
import { CustomProvider, Button, Input, SelectPicker } from 'rsuite';

const components = {
  // 按钮默认值
  Button: {
    defaultProps: {
      size: 'sm',
      appearance: 'ghost'
    }
  },

  // 输入框默认值
  Input: {
    defaultProps: {
      size: 'sm',
      placeholder: '请输入...'
    }
  },

  // 选择器默认值
  SelectPicker: {
    defaultProps: {
      size: 'sm',
      placeholder: '请选择',
      searchable: false,
      cleanable: false,
      virtualized: true
    }
  }

  // 根据需要添加更多组件
};

function App() {
  return (
    <CustomProvider components={components}>
      <Button>默认按钮</Button>
      <Input />
      <SelectPicker
        data={[
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' }
        ]}
      />
    </CustomProvider>
  );
}

export default App;
```
