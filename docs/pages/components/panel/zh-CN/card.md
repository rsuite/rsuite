### 卡片

<!--start-code-->

```js
const instance = (
  <Panel
    shaded
    bordered
    bodyFill
    style={{ display: 'inline-block', width: 240 }}
  >
    <img src="https://via.placeholder.com/240x240" height="240" />
    <Panel header="RSUITE">
      <p>
        <small>一套 React 的 UI 组件库，贴心的 UI 设计，友好的开发体验。</small>
      </p>
    </Panel>
  </Panel>
);

ReactDOM.render(instance);
```

<!--end-code-->
