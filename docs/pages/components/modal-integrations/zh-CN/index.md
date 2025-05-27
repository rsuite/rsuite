# Modal 集成 🧩

Modal 和 Drawer 与第三方库的集成。

## Nice Modal

[Nice Modal](https://github.com/eBay/nice-modal-react) 与 React Suite 的 Modal/Drawer 集成提供了轻量级、灵活定制的模态窗口解决方案。

## 使用

<div class="rs-doc-steps">

<h3 class="rs-doc-step-header">安装 Nice Modal</h3>

<div class="rs-doc-step-body">

首先，安装 `@ebay/nice-modal-react` 依赖：

```bash
npm install @ebay/nice-modal-react
```

</div>

<h3 class="rs-doc-step-header">创建 Modal 组件</h3>

<div class="rs-doc-step-body">

使用 `NiceModal.create` 创建可重用的 Modal 组件：

```tsx
import { Modal } from 'rsuite';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export const MyModal = NiceModal.create(({ id, name }) => {
  const modal = useModal();
  return (
    <Modal open={modal.visible} onClose={modal.hide} onExited={modal.remove} backdrop="static">
      <Modal.Header>
        <Modal.Title>Hello React Suite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Greetings: {id},{name}!
      </Modal.Body>
    </Modal>
  );
});
```

</div>

<h3 class="rs-doc-step-header">使用 Modal</h3>

<div class="rs-doc-step-body">

在应用中使用 `NiceModal.Provider` 包装您的应用，然后就可以在任何地方显示 Modal 了：

```jsx
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MyModal from './MyModal';

const App = () => {
  return (
    <NiceModal.Provider>
      <Button
        appearance="primary"
        onClick={() => {
          NiceModal.show(MyModal, { id: 'test', name: 'Nate' });
        }}
      >
        Show Modal
      </Button>
    </NiceModal.Provider>
  );
};
```

</div>

</div>

## 示例

### Modal

<!--{include:`nice-modal.md`}-->

### Drawer

<!--{include:`nice-modal-drawer.md`}-->
